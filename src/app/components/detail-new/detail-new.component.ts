import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.scss']
})
export class DetailNewComponent implements OnInit {

  noticia: any[] = [];
  constructor(private news: NewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.news.readOne(params.id).subscribe(res => {
        this.noticia.push(res);
        console.log(res);
      })
    })
  }

}
