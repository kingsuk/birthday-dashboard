import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';



@Injectable({
  providedIn: 'root'
})
export class WishService {
  private dbPath = '/wishes';

  wishData:any

  wishRef: AngularFireList<any>;
  userState: any;

  constructor(private db: AngularFireDatabase,
    public afs: AngularFireStorage,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone

    ) {
    this.wishRef = db.list(this.dbPath);


    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }

  setWishData(data){
    this.wishData=data
  }

  getAll(): AngularFireList<any> {
    return this.wishRef;
  }

  create(any: any): any {
    // Notiflix.Notify.success("Successfully Sent");
    return this.wishRef.push(any);

  }

  update(key: string, value: any): Promise<void> {
    return this.wishRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.wishRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.wishRef.remove();
  }

  getWishListByKey(id):any{

    return this.db.list(this.dbPath,ref=>ref.child(id)).valueChanges();




  }

  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        debugger
        this.router.navigate(['dashboard']);
        // this.ngZone.run(() => {
        //   this.router.navigate(['dashboard']);
        // });

      }).catch((error) => {
        Notiflix.Notify.failure(error.message);

        return error.message
      })
  }

  _otherSignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
        Notiflix.Notify.failure(error.message);

      throw Error(error.message)
      })
  }

  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

      }).catch((error) => {

        Notiflix.Notify.failure(error.message);
        return error.message
      })
  }



  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['index']);
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    return (user !== null && user.email=="admin@admin.com") ? true : false;
  }




}
