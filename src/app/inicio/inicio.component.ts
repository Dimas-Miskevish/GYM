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
      title: 'Image 1'
    }, {
      image: '../../assets/galeria2.jpg',
      thumbImage: '../../assets/galeria2.jpg',
      title: 'Image 2',
      alt: 'Image 2'
    }, {
      image: '../../assets/galeria3.jpg',
      thumbImage: '../../assets/galeria3.jpg',
      title: 'Image 3',
      alt: 'Image 3'
    }, {
      image: '../../assets/galeria4.jpg',
      thumbImage: '../../assets/galeria4.jpg',
      title: 'Image 4',
      alt: 'Image 4'
    }, {
      image: '../../assets/galeria5.jpg',
      thumbImage: '../../assets/galeria5.jpg',
      title: 'Image 5',
      alt: 'Image 5'
    }
];

}
