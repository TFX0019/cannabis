import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {

  newsForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    text: new FormControl(''),
    fecha: new FormControl(''),
    image: new FormControl('')
  })
  validate = {
    title: false,
    text: false,
    image: false,
  }
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  imageSrc: any;
  porcentaje: number;
  constructor(private storage: AngularFireStorage, private news: NewsService) { }

  ngOnInit() {

  }


  async addnoticia() {
    if (this.newsForm.value.title === '') {
      this.validate.title = true;
      if (this.newsForm.value.text === '') {
        this.validate.text = true;
        if (this.newsForm.value.image === '') {
          this.validate.text = true;
          this.prepare();
        } else {
          this.validate.image = false;
        }
      } else {
        this.validate.text = false;
      }
    } else {
      this.validate.title = false;
    }
  }

  async prepare() {
    // selected fecha
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaF = fecha.toLocaleDateString("es-CO", opciones);
    this.newsForm.controls.fecha.setValue(fechaF);

    // description
    const description = this.newsForm.value.text.substr(1, 100);
    this.newsForm.controls.description.setValue(description);

    this.news.add(this.newsForm.value).then(() => {
      this.newsForm.setValue({
        title: '',
        description: '',
        text: '',
        fecha: '',
        image: ''
      })
    })
  }

  async uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
      const filePath = this.newsForm.value.title;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);
      task.percentageChanges().subscribe(res => {
        console.log(res);
        this.porcentaje = res;
      })

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(url => {
            this.newsForm.controls.image.setValue(url);
          })
        })
      ).subscribe()
        
      // this.downloadURL.subscribe(res => {
      //   console.log(res);
      // })
    } else {
      this.validate.image = false;
    }
  }

}
