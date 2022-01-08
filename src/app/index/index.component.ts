import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishService } from './../wish.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  password = "KISHNISH1801"
  familyPassword = "K181284"
  inputText: string = "";
  showError = false;

  passwordMatch: boolean = false

  form = {
    name: "",
    email: "",
    password: "",
    relationship: "",
    wish: "",
    isOpen:false

  }

  constructor(private router: Router, private _service: WishService) { }



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


  logIn(password) {

    if (this.password == password) {
      this.router.navigate(["/dashboard"])
    }
    {
      this.showError = true
    }
  }

  familyPasswordCheck() {
    if (this.familyPassword == this.form.password) {
      this.passwordMatch = true

    }
    else {
      this.passwordMatch = false
    }

  }

  hi() {

    try {
      this._service.create(this.form).then(() => {
        console.log('Created new item successfully!');

      });
    }
    catch (error) {
      console.log(error)


    }


  }




}
