import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/internal/operators/finalize';
import { tap } from 'rxjs/operators';
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
    isOpen: false,
    files:[]

  }
  fileuploded:boolean=false
  showLoader:any=false;
  uploads: any[];
  downloadURLs: any[];
  uploadPercent: Observable<number>;

  constructor(private router: Router, private _service: WishService, private storage: AngularFireStorage) { }



  ngOnInit(): void {



  }
  imageSrc: any;
  readURL(event: any): void {

    this.showLoader=true;
    // reset the array
    this.uploads = [];
    this.downloadURLs = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];
    try{
      for (const file of filelist) {
        const filePath = `files/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        const _percentage$ = task.percentageChanges();
        allPercentage.push(_percentage$);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();

        // get notified when the download URL is available
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              console.log("url",url)
              this.downloadURLs = this.downloadURLs.concat([url]);
              console.log(this.downloadURLs)
              if(filelist.length===this.downloadURLs.length){
                console.log("complete now with",this.downloadURLs)
                this.form.files=this.downloadURLs
                this.showLoader=false;
                this.fileuploded=true


              }
            });

          })
        ).subscribe();

      }
    }
    catch(error){
      this.showLoader=false;

    }


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

  submit() {

    try {
      this._service.create(this.form).then(() => {

        this.form = {
          name: "",
          email: "",
          password: "",
          relationship: "",
          wish: "",
          isOpen: false,
          files:[]

        }


      });
    }
    catch (error) {
      console.log(error)


    }


  }





}
