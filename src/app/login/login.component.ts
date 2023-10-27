import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/services/user.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFormVisible = false;
  isRegistrationVisible = false; // Inicialmente, oculta el formulario de registro
  formReg: FormGroup;
  
  registroExitoso = false;
  
  //registro
  constructor(private router: Router, private userService: UserService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
      
    });
  } 
  ngOnInit(): void{

  }
  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.registroExitoso = true;
        setTimeout(() => {
          this.registroExitoso = false;
        }, 5000);
      })
    .catch(error => console.log (error));
  
  }
  
  //inicio de sesion
  login() {
    const email = this.formReg?.get('email')?.value;
    const password = this.formReg?.get('password')?.value;
  
    this.userService.login(email, password)
      .then(response => {
        console.log(response);
        // Maneja el inicio de sesión exitoso aquí
        this.router.navigate(['/mi-cuenta']); // Redirige al usuario a una página de inicio después del inicio de sesión
      })
      .catch(error => {
        console.log(error);
        // Maneja el inicio de sesión fallido aquí, muestra un mensaje de error o realiza otras acciones necesarias
      });
  }
  
  
 

  //cierre de formulario
  closeLoginForm() {
    console.log("SE CERRO");
    this.isLoginFormVisible = false;
    this.router.navigate(['/']); // Redirige al componente raíz, que corresponde a la ruta '/' definida en tu enrutamiento.
  }

  showRegistrationForm() {
    this.isRegistrationVisible = true;
  }

  hideRegistrationForm() {
    this.isRegistrationVisible = false;
  }
}