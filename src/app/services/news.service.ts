import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface News {
  id: string;
  title: string;
  description: string;
  text: string;
  image: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private shirtCollection: AngularFirestoreCollection<News>;
  shirts: Observable<News[]>;

  constructor(private readonly afs: AngularFirestore) { 
    this.shirtCollection = afs.collection<News>('noticias');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.shirts = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  readData() {
    return this.shirts;
  }

  readOne(id: string) {
    return this.shirtCollection.doc<News[]>(id).valueChanges();
  }

  add(news: News) {
    return this.shirtCollection.add(news);
  }

}
