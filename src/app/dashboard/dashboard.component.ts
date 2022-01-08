import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { WishService } from './../wish.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  wishes:any;
  _wish: any[];

  constructor(private _service: WishService,private router:Router) { }

  ngOnInit(): void {
    this.getWishes()


  }



  getWishes(): void {
    this._service.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.wishes=data.filter(_=>_.relationship=="NISCHAY");;
      this._wish=data;
      console.log(this.wishes)
    });
  }




  filter(event,value){
    event.preventDefault();
    this.wishes=this._wish.filter(_=>_.relationship==value)
    console.log(this.wishes)

  }

  goToWish(box:any){



    if (box.key && !box.isOpen) {
      this._service.update(box.key, {isOpen:true})
        .then(() => {
          this.router.navigate(['/wish',box.key])
          console.log('The tutorial was updated successfully!')

        })
        .catch(err => console.log(err));
    }
    else{
      this.router.navigate(['/wish',box.key])


    }



  }

  logOut(){
    this._service.SignOut();
  }








}
