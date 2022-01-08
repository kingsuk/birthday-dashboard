import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwlModule } from 'ngx-owl-carousel';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { WishComponent } from './wish/wish.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,

} from "@angular/fire/storage";


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent,WishComponent
  ],
  imports: [

  BrowserModule,
    AppRoutingModule,
    OwlModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
