import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TurnosService } from 'src/services/turnos.services';
import { Turno, usuarios, Deporte } from 'src/interfaces/gym.interface';
import { UserService } from 'src/services/user.services';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';  // Asegúrate de importar NgForm
import { User } from '@angular/fire/auth';







@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  usuarioAutenticado: boolean = true;
  deportes: any[] = []; // Define una variable para almacenar los deportes obtenidos
  dia: string = ''; // Define una variable para el día
  hora: string = ''; // Define una variable para la hora
  id: string = '';
  nombreCompleto: string = '';
  email: string = '';
  nombreDep: any;
  usuarios: any[] = [];
  turnos: Turno[] = [];
  turnosDisponibles: any[] = []; // Almacena los turnos disponibles
  mostrarSacarTurnos: boolean = false;
  mostrarMisTurnos: boolean = false;
  mostrarBotones = true;
  modoModificacion = false;
  turnoSeleccionado: Turno | null = null;
  mostrarMensaje: boolean = false;

  

  ultimoId: number = 0; // Declarar la variable ultimoId aquí

  @ViewChild('turnoForm', { static: false }) turnoForm: NgForm | undefined;







  constructor(private router: Router, private turnosService: TurnosService, private userService: UserService) {

  }
  ngOnInit() {
    console.log('ngOnInit de TurnosComponent');


    const usuarioAutenticado: User | null = this.userService.getCurrentUser();

    if (usuarioAutenticado) {
      console.log('ID del usuario autenticado:', usuarioAutenticado.uid);
      console.log('Correo electrónico del usuario autenticado:', usuarioAutenticado.email);
      console.log('Nombre completo del usuario autenticado:', usuarioAutenticado.displayName);
    } else {
      console.log('No hay usuario autenticado');
    }
    // Llama al servicio para obtener la lista de deportes al cargar el componente
    this.turnosService.obtenerDeportes().then((deportes) => {
      this.deportes = deportes;
      console.log(deportes);
    });
    this.userService.obtenerUsuariosPorEmail(this.email).then((usuarios) => {
      this.usuarios = usuarios;
      console.log(usuarios);

    });
    this.cargarTurnos();

  }
  ngOnDestroy() {

    if (this.turnoForm) {
      this.turnoForm.resetForm();
    }


    console.log('ngOnDestroy de TurnosComponent');
  }
  sacarTurnos() {
    this.mostrarBotones = false;
    this.mostrarSacarTurnos = true;
    this.mostrarMisTurnos = false;
    this.turnoForm?.resetForm(); // Asegura que el formulario se reinicie

  }

  MisTurnos() {
    this.mostrarBotones = false;
    this.mostrarMisTurnos = true;
    this.mostrarSacarTurnos = false;
  }
  desaparecerAmbos() {
    this.mostrarSacarTurnos = false;
    this.mostrarMisTurnos = false;
  }
  regresar() {
    this.mostrarBotones = true;
    this.mostrarMisTurnos = false;
    this.mostrarSacarTurnos = false;
    this.modoModificacion = false;

  }



cargarTurnos() {
  this.turnosService.getTurnos().subscribe((turnos: Turno[]) => {
    this.turnos = turnos.map((turno: Turno) => {
      return {
        ...turno,
        id: turno.id || '', // Agregar id o cadena vacía si no está definido
      };
    });
    console.log('Turnos cargados:', this.turnos);
  }, (error: any) => {
    console.error('Error al cargar los turnos', error);
  });
}

async eliminarTurno(idAsignado: string | undefined | null): Promise<void> {
  console.log('Eliminar turno llamado con ID asignado:', idAsignado);

  if (idAsignado) {
    console.log('ID del turno a eliminar:', idAsignado);
    await this.turnosService.eliminarTurno(idAsignado);
    console.log('Turno eliminado con éxito');
    this.cargarTurnos(); // Recargar la lista después de eliminar un turno
  } else {
    console.error('ID de turno asignado no válido');
  }
}

mostrarTurnos() {
  this.mostrarMisTurnos = true; // Muestra la lista de turnos disponibles
  // Obtener el último turno de la lista (suponiendo que la lista no está vacía)
  const ultimoTurno = this.turnos[this.turnos.length - 1];
  if (ultimoTurno) {
    console.log('ID del último turno:', ultimoTurno.id);
  } else {
    console.log('No hay turnos disponibles');
  }
  this.cargarTurnos();
}

modificarTurno(idAsignado: string) {
  // Busca el turno que se va a modificar

  const turnoAModificar = this.turnos.find((turno) => turno.idAsignado === idAsignado);

  // Verifica que se haya encontrado el turno
  if (turnoAModificar) {
    // Asigna los valores del turno para habilitar la sección de modificación
    this.turnoSeleccionado = { ...turnoAModificar }; // Crear una copia para no modificar el original

    // Abre la sección de modificación del turno
    this.modoModificacion = true;
    this.mostrarMisTurnos = false;
    this.mostrarSacarTurnos = false;
  } else {
    console.error('No se encontró el turno a modificar.');
  }
}
reservarOActualizarTurno() {
  if (this.modoModificacion) {
    this.modificarTurnoExistente(); // Llama a tu función de modificación existente
  } else {
    this.reservarTurno();
  }
}
prepararModificacion(turno: Turno) {
  this.turnoSeleccionado = { ...turno }; // Almacena el turno seleccionado para modificación
  this.modoModificacion = true;
  this.mostrarMisTurnos = false;
  this.mostrarSacarTurnos = false;
}

async modificarTurnoExistente() {
  try {
    if (this.turnoSeleccionado) {
      const idAsignadoOriginal = this.turnoSeleccionado.idAsignado;
      console.log('Modificando turno. ID original:', idAsignadoOriginal);

      // Generar un nuevo ID para el turno modificado
      const nuevoIdAsignado = generarNuevoId(); // Implementa esta función según tus necesidades

      // Actualizar el ID del turno seleccionado
      this.turnoSeleccionado.idAsignado = nuevoIdAsignado;

      // Lógica para modificar el turno en la base de datos (Firebase)
      await this.turnosService.modificarTurno(idAsignadoOriginal, this.turnoSeleccionado);

      console.log('Turno modificado con éxito. Nuevo ID:', nuevoIdAsignado);

      // Eliminar el turno original si es necesario
      await this.turnosService.eliminarTurno(idAsignadoOriginal);

      // Cierra la sección de modificación del turno
      this.modoModificacion = false;
      this.mostrarMisTurnos = true;
      this.mostrarSacarTurnos = false;
      this.turnoSeleccionado = null; // Restablece el turno seleccionado
    } else {
      console.error('No se ha seleccionado un turno para modificar.');
    }
    // Recargar la lista de turnos después de modificar
    this.cargarTurnos();
  } catch (error) {
    console.error('Error al modificar el turno:', error);
  }


function generarNuevoId() {
  // Implementa la lógica para generar un nuevo ID único, por ejemplo, usando un timestamp
  return Date.now().toString();
}

  
}




cancelarModificacion() {
  this.turnoSeleccionado = null;
  this.modoModificacion = false;
}



async reservarTurno() {
  try {
    // Incrementa el contador antes de usarlo
    this.ultimoId++;

    const turno = {
      idAsignado: this.ultimoId.toString(),  // Convierte a cadena
      nombreDep: this.nombreDep,
      dia: this.dia,
      hora: this.hora,
      usuarios: {
        id: '',
        nombreCompleto: '',
        email: '',
      },
    };

    // Llama al servicio para reservar el turno
    await this.turnosService.reservarTurno(turno);

    // Realiza alguna acción después de reservar el turno
    console.log('Turno reservado con éxito. ID:', turno.idAsignado, turno);
    this.cargarTurnos();
    this.mostrarMensaje = true;

  } catch (error) {
    console.error('Error al reservar el turno:', error);
  }
}


  cerrarMisTurnos() {
    this.usuarioAutenticado = false;
    this.router.navigate(['/mi-cuenta']); // Redirige al componente raíz, que corresponde a la ruta '/' definida en tu enrutamiento.

    console.log('Se cerró');
  }

  cerrarSesion() {
    // Realiza las operaciones de cierre de sesión aquí, por ejemplo, utilizando un servicio de autenticación.
    // Puedes cambiar usuarioAutenticado a 'false' después de cerrar la sesión.
    this.usuarioAutenticado = false;

    // Redirige al componente raíz (por ejemplo, /mi-cuenta) después de cerrar la sesión.
    this.router.navigate(['/mi-cuenta']); // Asegúrate de que la ruta sea correcta según tu configuración.
  }
}

/*

  agregarTurno() {
 
    // Crea un objeto `nuevoTurno` con los datos del turno
    const nuevoTurno: gymo = {
      deporteSeleccionado: this.nuevoTurno.deporteSeleccionado,
      dia: this.nuevoTurno.dia,
      hora: this.nuevoTurno.hora,
    };
 
    // Luego, llama al método agregarTurno de tu servicio
    this.turnosService
      .agregarTurno(nuevoTurno)
      .then(() => {
        // Manejar la respuesta después de agregar el turno, por ejemplo, mostrar un mensaje de éxito.
        console.log('Turno agregado con éxito');
        // También puedes cargar los turnos nuevamente después de agregar uno nuevo.
        this.cargarTurnos();
      })
      .catch((error: any) => {
        // Manejar errores, como mostrar un mensaje de error.
        console.error('Error al agregar el turno', error);
      });
  }
  
 
  eliminarTurno(id: string) {
    // Lógica para eliminar un turno utilizando el servicio de turnos.
    this.turnosService.eliminarTurno(id)
      .subscribe((response: any) => {
        // Manejar la respuesta después de eliminar el turno, por ejemplo, mostrar un mensaje de éxito.
        console.log('Turno eliminado con éxito');
        // También puedes cargar los turnos nuevamente después de eliminar uno.
        this.cargarTurnos();
      }, (error: any) => {
        // Manejar errores, como mostrar un mensaje de error.
        console.error('Error al eliminar el turno', error);
      });
  }
 
 
 
};

 
 
 
 
 
 
  cargarTurnos() {
    // Lógica para cargar los turnos desde el servicio de turnos.
    this.turnosService.getTurnosPorActividad(this.actividadSeleccionada)
      .subscribe((turnos: any[]) => {
        this.turnos = turnos;
      }, (error: any) => {
        console.error('Error al cargar los turnos', error);
      });
  }
 
 
 
  convertirFecha(fechaString: string): string | null {
    try {
      const parts = fechaString.split(',').map(part => part.trim());
      const fechaPart = parts[0];
      const horaPart = parts[1];
      let fecha = new Date(fechaPart);
 
      if (horaPart) {
        const hora = horaPart.split(' ')[0];
        fecha.setHours(Number(hora.split(':')[0]));
        fecha.setMinutes(Number(hora.split(':')[1]));
      }
 
      // Ahora, formatea la fecha como una cadena legible
      return fecha.toLocaleString();
    } catch (error) {
      console.error('Error al convertir la fecha', error);
      return null;
    }
  }
}*/
