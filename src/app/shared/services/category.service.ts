import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', ref => {
      return ref.orderByChild('name');
    });
  }
}