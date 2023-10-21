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
  
  constructor(private router: Router, private userService: UserService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  } 
  ngOnInit(): void{

  }
  onSubmit (){
    this.userService.register(this.formReg.value)
    .then(response =>{
      console.log(response);
      
    })
    .catch(error => console.log (error));
  
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