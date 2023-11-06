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
 diasYHorariosDisponibles: any[] = []; // Agrega esta línea para declarar la propiedad
 nuevoTurno: any = {
  actividad: '',
  fecha: '',
  hora: '',
};
fechasDisponibles: string[] = [];





  constructor(private router: Router, private turnosService: TurnosService) {
    // Aquí puedes implementar la lógica de autenticación para establecer el valor de usuarioAutenticado
    // Por ejemplo, cuando el usuario inicie sesión, puedes establecer usuarioAutenticado en true.
  }

  sacarTurno() {
    // Lógica para agregar un turno utilizando el servicio de turnos
    this.turnosService.agregarTurno(
      this.nuevoTurno.actividad,
      new Date(this.nuevoTurno.fecha),
      this.nuevoTurno.hora
    ).subscribe((response: any) => {
      // Manejar la respuesta después de agregar el turno, por ejemplo, mostrar un mensaje de éxito.
      console.log('Turno agregado con éxito');
    }, (error: any) => {
      // Manejar errores, como mostrar un mensaje de error.
      console.error('Error al agregar el turno', error);
    });
  }

  ngOnInit() {
    // Ejemplo de cómo cargar los turnos al iniciar el componente (puedes cargarlos según tu lógica)
    this.cargarTurnos();
  }

  cargarTurnos() {
    // Lógica para cargar los turnos desde el servicio de turnos
    this.turnosService.getTurnosPorActividad(this.actividadSeleccionada)
      .subscribe((turnos: any[]) => {
        this.turnos = turnos;
      }, (error: any) => {
        console.error('Error al cargar los turnos', error);
      });
  }

  cargarDiasYHorariosDisponibles() {
    if (this.actividadSeleccionada) {
      this.turnosService.getDiasYHorariosPorActividad(this.actividadSeleccionada)
        .subscribe((diasYHorarios: any[]) => {
          this.diasYHorariosDisponibles = diasYHorarios;
        }, (error: any) => {
          console.error('Error al cargar los días y horarios disponibles', error);
        });
    }
  }
  
  agregarActividad() {
    this.turnosService.agregarActividad("Boxeo", ["2023-11-06", "2023-11-08", "2023-11-10"]).subscribe(
      () => {
        // La actividad se agregó con éxito.
        console.log('Actividad "Boxeo" agregada con éxito');
      },
      (error) => {
        // Manejar errores si ocurrieron problemas al agregar la actividad.
        console.error('Error al agregar la actividad "Boxeo"', error);
      }
    );
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
  
  
  cargarFechasDisponibles() {
    if (this.actividadSeleccionada) {
      this.turnosService.getFechasDisponiblesPorActividad(this.actividadSeleccionada)
        .subscribe((fechas: (Date | null)[]) => {
          this.fechasDisponibles = fechas
            .filter(fecha => fecha !== null)
            .map(fecha => {
              const date = fecha as Date;
              return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
            });
        }, (error: any) => {
          console.error('Error al cargar las fechas disponibles', error);
        });
    }
  }
  
  
  
  
  
  
  cerrarSesion() {
    // Realiza las operaciones de cierre de sesión aquí, por ejemplo, usando un servicio de autenticación.
    // Puedes cambiar usuarioAutenticado a 'false' después de cerrar la sesión.
    this.usuarioAutenticado = false;

    // Redirige al componente raíz (por ejemplo, /mi-cuenta) después de cerrar la sesión.
    this.router.navigate(['/mi-cuenta']); // Asegúrate de que la ruta sea correcta según tu configuración.
  }

  agregarTurno() {
    // Lógica para agregar un turno utilizando el servicio de turnos
    this.turnosService.agregarTurno(this.actividadSeleccionada, new Date(), '08:00 AM')
      .subscribe((response: any) => {
        // Manejar la respuesta después de agregar el turno, por ejemplo, mostrar un mensaje de éxito.
        console.log('Turno agregado con éxito');
        // También puedes cargar los turnos nuevamente después de agregar uno nuevo.
        this.cargarTurnos();
      }, (error: any) => {
        // Manejar errores, como mostrar un mensaje de error.
        console.error('Error al agregar el turno', error);
      });
  }

  eliminarTurno(id: string) {
    // Lógica para eliminar un turno utilizando el servicio de turnos
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
