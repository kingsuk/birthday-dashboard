import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class WishService {
  private dbPath = '/wishes';

  wishRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.wishRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<any> {
    return this.wishRef;
  }

  create(any: any): any {
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
}