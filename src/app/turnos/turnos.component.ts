import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnosService } from 'src/services/turnos.services';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  usuarioAutenticado: boolean = true;
  actividadSeleccionada: string = '';
  turnos: any[] = [];
  actividadesDisponibles: string[] = ['boxeo', 'gap', 'hit', 'funcional', 'crossfit'];
  nuevoTurno: any = {
    actividad: '',
    fecha: '',
    hora: '',
  };
  fechasDisponibles: string[] = [];
  getFecha: any = [];

  constructor(private router: Router, private turnosService: TurnosService) {
    // Implementa aquí la lógica de autenticación para establecer el valor de usuarioAutenticado.
    // Por ejemplo, cuando el usuario inicie sesión, establece usuarioAutenticado en true.
  }

  // Agrega este código en tu componente de Angular

cargarTurnosPorActividadYFecha() {
  this.turnosService
    .getTurnosPorActividadYFecha(this.actividadSeleccionada, this.nuevoTurno.fecha)
    .subscribe((turnos: any[]) => {
      this.turnos = turnos;
    });
}


  sacarTurno() {
    // Lógica para agregar un turno utilizando el servicio de turnos.
    this.turnosService.agregarTurno(
      this.nuevoTurno.actividad,
      this.nuevoTurno.fecha,
      this.nuevoTurno.hora
    ).then(() => {
      // Manejar la respuesta después de agregar el turno, por ejemplo, mostrar un mensaje de éxito.
      console.log('Turno agregado con éxito');
      // También puedes cargar los turnos nuevamente después de agregar uno nuevo.
      this.cargarTurnos();
    }).catch((error: any) => {
      // Manejar errores, como mostrar un mensaje de error.
      console.error('Error al agregar el turno', error);
    });
  }

  ngOnInit() {
    this.cargarTurnos();
    this.turnosService.getFecha().subscribe((fecha: any) => {
      this.getFecha = fecha;
      console.log(this.getFecha);
    });
  }

  cargarTurnos() {
    // Lógica para cargar los turnos desde el servicio de turnos.
    this.turnosService.getTurnosPorActividad(this.actividadSeleccionada)
      .subscribe((turnos: any[]) => {
        this.turnos = turnos;
      }, (error: any) => {
        console.error('Error al cargar los turnos', error);
      });
  }

  cargarFechasDisponibles() {
    // Carga las fechas disponibles para la actividad seleccionada.
    this.turnosService.getFechasDisponibles(this.actividadSeleccionada)
      .then((fechas: string[] | null) => {
        if (fechas) {
          this.fechasDisponibles = fechas;
        } else {
          // Maneja el caso en el que no hay fechas disponibles.
        }
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

  cerrarSesion() {
    // Realiza las operaciones de cierre de sesión aquí, por ejemplo, utilizando un servicio de autenticación.
    // Puedes cambiar usuarioAutenticado a 'false' después de cerrar la sesión.
    this.usuarioAutenticado = false;

    // Redirige al componente raíz (por ejemplo, /mi-cuenta) después de cerrar la sesión.
    this.router.navigate(['/mi-cuenta']); // Asegúrate de que la ruta sea correcta según tu configuración.
  }


  agregarTurno() {
    const fechaISO8601 = new Date().toISOString();
    // Luego, pasa esta fecha a tu método agregarTurno
    this.turnosService.agregarTurno(this.actividadSeleccionada, fechaISO8601, '08:00 AM')
      .then(() => {
        // Manejar la respuesta después de agregar el turno
        console.log('Turno agregado con éxito');
        // También puedes cargar los turnos nuevamente después de agregar uno nuevo.
        this.cargarTurnos();
      }).catch((error: any) => {
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

  cerrarMisTurnos() {
    this.usuarioAutenticado = false;
    this.router.navigate(['/mi-cuenta']); // Redirige al componente raíz, que corresponde a la ruta '/' definida en tu enrutamiento.

    console.log('Se cerró');
  }
}
