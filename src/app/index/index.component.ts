import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  imageSrc: any;
  readURL(event: Event): void {
    // if (event.target.files && event.target.files[0]) {
    //     const file = event.target.files[0];

    //     const reader = new FileReader();
    //     reader.onload = e => this.imageSrc = reader.result;

    //     reader.readAsDataURL(file);
    // }
}
}
