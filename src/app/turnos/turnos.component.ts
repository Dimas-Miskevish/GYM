import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnosService } from 'src/services/turnos.services';
import { Turno, usuarios, Deporte } from 'src/interfaces/gym.interface';
import { UserService } from 'src/services/user.services';



@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  usuarioAutenticado: boolean = true;
  deportes: any[]=[]; // Define una variable para almacenar los deportes obtenidos
  dia: string = ''; // Define una variable para el día
  hora: string = ''; // Define una variable para la hora
  id: string = '';
  nombreCompleto: string = '';
  email: string = '';
  nombreDep: any;
  usuarios: any[]=[];
  
    
  
    constructor(private router: Router, private turnosService: TurnosService, private userService: UserService) {
  
    }
    ngOnInit() {
      // Llama al servicio para obtener la lista de deportes al cargar el componente
      this.turnosService.obtenerDeportes().then((deportes) => {
        this.deportes = deportes;
        console.log(deportes); 
      });
        this.userService.obtenerUsuariosPorEmail(this.email).then((usuarios) =>{
         this.usuarios = usuarios;
         console.log(usuarios); 

        });
      }// Agrega esta línea para verificar si deportes contiene datos válidos
        

     
    
  
    reservarTurno() {
      
      
      // Crea un objeto Turno con los datos seleccionados por el usuario
      const turno: Turno = {
        id: this.id, // Puedes generar un ID de turno, por ejemplo, con Firebase
        nombreDep: this.nombreDep,
        dia: this.dia,
        hora: this.hora,
        usuarios: {
          id: this.id, // ID del usuario que está realizando la reserva
          nombreCompleto: this.nombreCompleto, //  usuario
          email: this.email
        }
      };
    
      // Llama al servicio para reservar el turno
      this.turnosService.reservarTurno(turno).then(async () => {
        // Realiza alguna acción después de reservar el turno, como mostrar un mensaje de éxito

        console.log('Turno reservado con éxito.');
        const datosUsuario = await this.userService.obtenerUsuariosPorEmail(this.email);

        console.log('Datos del usuario después de reservar turno:', this.id, this.nombreCompleto, this.email);

      });
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
    