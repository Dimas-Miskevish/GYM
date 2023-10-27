import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from 'src/services/user.services';


@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent {
  constructor(private userService: UserService) {}

  get usuarioAutenticado(): boolean {
    return this.userService.getCurrentUser() !== null;
    
  }
}
