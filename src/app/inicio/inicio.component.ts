import { Component} from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
  
})
export class InicioComponent {


   imgCollection: Array<object> = [
    {
      image: '../../assets/galeria1.jpg',
      thumbImage: '../../assets/galeria1.jpg',
      alt: 'Image 1',
    }, {
      image: '../../assets/galeria2.jpg',
      thumbImage: '../../assets/galeria2.jpg',
      alt: 'Image 2'
    }, {
      image: '../../assets/galeria3.jpg',
      thumbImage: '../../assets/galeria3.jpg',
      alt: 'Image 3'
    }, {
      image: '../../assets/galeria4.jpg',
      thumbImage: '../../assets/galeria4.jpg',
      alt: 'Image 4'
    }, {
      image: '../../assets/galeria5.jpg',
      thumbImage: '../../assets/galeria5.jpg',
      alt: 'Image 5'
    }
];
}

