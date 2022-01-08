import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishService } from './../wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  wish:any;
  name:any;
  _files: any;
  key: any;


  constructor(private _service: WishService, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.key = this.route.snapshot.params.id;
    this._service.getWishListByKey(this.key).subscribe(data => {
   console.log(data)

   this.wish=data[6];
   this.name=data[3];
   this._files=data[1]
   console.log(this._files)


 });

  }

}
