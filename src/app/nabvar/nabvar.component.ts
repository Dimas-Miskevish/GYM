import { Component } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent {

  
  backgroundIndex = 0;
  backgrounds = ['../../assets/galeria1.jpg', '../../assets/galeria2.jpg', '../../assets/galeria3.jpg', '../../assets/galeria4.jpg', '../../assets/galeria5.jpg' ];

  changeBackground() {
    this.backgroundIndex = (this.backgroundIndex + 1) % this.backgrounds.length;
  }

  getBackgroundImage() {
    return `url('${this.backgrounds[this.backgroundIndex]}')`;
  }
}

