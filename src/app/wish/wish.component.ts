import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishService } from './../wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  wish: any;
  name: any;
  _files: any;
  key: any;
  finalFiles: any = []


  constructor(private _service: WishService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.key = this.route.snapshot.params.id;
    this._service.getWishListByKey(this.key).subscribe(data => {
      console.log(data)

      this.wish = data[6];
      this.name = data[3];
      this._files = data[1]


      this._files.map(_ => {
        let isImage = this.isImage(_);
        this.finalFiles.push({ isImage, url: _ })

      })
      console.log(this.finalFiles)


    });

  }

  logOut(){
    this._service.SignOut();
  }



  isImage(filename) {


    if (filename.includes(".jpg") || filename.includes(".gif") || filename.includes(".bmp") || filename.includes(".jpeg") || filename.includes(".jpg") | filename.includes(".png")) {
      return true
    }
    else  {
      return false;
    }

    // (filename.includes('.m4v') || filename.includes('.avi') || filename.includes('.mpg') || filename.includes('.mp4'))

  }


}
