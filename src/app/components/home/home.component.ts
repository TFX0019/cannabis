import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { WOW } from 'wowjs/dist/wow.min';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  noticias: any;
  constructor(private news: NewsService) { }

  ngOnInit() {
    this.news.readData().subscribe(res => {
      this.noticias = res;
      console.log(res);
    })
  }
  
  ngAfterViewInit() {
    new WOW().init();
  }

}
