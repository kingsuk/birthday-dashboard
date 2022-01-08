import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/internal/operators/finalize';
import { WishService } from './../wish.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('someInput') someInput!: ElementRef;
  inputText: string = "";
  showError = false;
  familyEmail = "senderEmail@gmail.com"
  email = "admin@admin.com"

  passwordMatch: boolean = false

  form = {
    name: "",
    email: "",
    password: "",
    relationship: "",
    wish: "",
    isOpen: false,
    files: [],


  }
  fileuploded: boolean = false
  showLoader: any = false;
  uploads: any[];
  downloadURLs: any[];
  uploadPercent: Observable<number>;
  filelist: any;

  constructor(private router: Router, private _service: WishService, private storage: AngularFireStorage) { }



  ngOnInit(): void {





  }
  imageSrc: any;


  fileUpload(filelist) {
    debugger
    this.showLoader = true;
    // reset the array
    this.uploads = [];
    this.downloadURLs = [];
    const allPercentage: Observable<number>[] = [];
    try {
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
              console.log("url", url)
              this.downloadURLs = this.downloadURLs.concat([url]);
              console.log(this.downloadURLs)
              if (filelist.length === this.downloadURLs.length) {
                console.log("complete now with", this.downloadURLs)
                this.form.files = this.downloadURLs
                this.showLoader = false;
                this.fileuploded = true
                this._service.create(this.form).then(() => {
                  Notiflix.Notify.success("Successfully Sent");
                  this.form = {
                    name: "",
                    email: "",
                    password: "",
                    relationship: "",
                    wish: "",
                    isOpen: false,
                    files: []

                  }

                });





              }
            });

          })
        ).subscribe();

      }
    }
    catch (error) {
      this.showLoader = false;

    }

  }

  readURL(event: any): void {

    this.filelist = event.target.files;


  }


  logIn(password) {
    try {

      this._service.SignIn(this.email, password)

    } catch (error) {
      this.showError = true

    }


  }

  ngAfterViewInit(): void {
    this.playAudio();



  }

  // familyPasswordCheck() {
  //   if (this.familyPassword == this.form.password) {
  //     this.passwordMatch = true

  //   }
  //   else {
  //     this.passwordMatch = false
  //   }

  // }




  submit() {

    if (this.form.password && this.form.wish) {
      this._service._otherSignIn(this.familyEmail, this.form.password).then(result => {


        try {

          this.fileUpload(this.filelist)

          // this.form = {
          //   name: "",
          //   email: "",
          //   password: "",
          //   relationship: "",
          //   wish: "",
          //   isOpen: false,
          //   files: []

          // }
          // this.fileuploded = false;
          // this.showLoader = false;





        }
        catch (error) {
          console.log(error)


        }


      })
    }
    else {
      Notiflix.Notify.info("Please Enter Valid details");


    }







  }


  isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        //etc
        return true;
    }
    return false;
  }

  isVideo(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        // etc
        return true;
    }
    return false;
  }

  getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }



  playAudio() {
    //   let audio = new Audio();
    //   audio.src = "assets/audio/tune4.mp3";
    //   audio.load();
    //   audio.muted=true;
    //   audio.play();
    //   audio.muted=false;
    //   audio.play();


    var audio = new Audio();
    audio.src = 'assets/audio/tune4.mp3';
    // when the sound has been loaded, execute your code
    audio.oncanplaythrough = (event) => {
      var playedPromise = audio.play();
      if (playedPromise) {
        playedPromise.catch((e) => {
          console.log(e)
          if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
            console.log(e.name);
          }
        }).then(() => {
          console.log("playing sound !!!");
        });
      }
    }
  }





}
