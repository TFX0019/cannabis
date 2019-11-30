import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { DetailNewComponent } from './components/detail-new/detail-new.component';
import { NewsComponent } from './components/news/news.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { EditNewComponent } from './components/edit-new/edit-new.component';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    DetailNewComponent,
    NewsComponent,
    EditNewComponent,
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
