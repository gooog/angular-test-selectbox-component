import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    a = false;
    selectboxOptions = [
      {id: 1, display: 'TOYOTA'},
      {id: 2, display: 'NISSAN'},
      {id: 3, display: 'MERCEDES BENZ'},
      {id: 4, display: 'BMW'},
      {id: 5, display: 'HONDA'},
      {id: 6, display: 'MAZDA'},
      {id: 7, display: 'HYUNDAI'},
      {id: 8, display: 'MITSUBISHI'},
      {id: 8, display: 'HUMMER'},
      {id: 10, display: 'FIAT'},
      {id: 11, display: 'FORD'},
      {id: 12, display: 'KIA'}
    ];

    optionSelected(event) {
        console.log(event);
    }
}
