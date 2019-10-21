import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import * as fromTodoListSelectors from '../store/todo-list/selectors';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private store: Store<State>) {
    this.retrieveListFromDataBase();
    this.retrieveListFromStore();
  }

  retrieveListFromStore() {
    this.store.select(fromTodoListSelectors.getTodoItems).subscribe(value => this.todoListSubject.next(value));
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  getTodoList() {
    return this.todoListSubject.asObservable();
  }

  addItem(item: TodoItem) {
    this.http.post('http://localhost:3000/items',
      {title: item.title, completed: item.completed || false}).subscribe(
      () => this.retrieveListFromDataBase(),
      () => { console.log('ERROR')},
      () => { console.log('COMPLETED')}
    );
  }

  updateItem(item: TodoItem, changes) {
    return this.http.put(`http://localhost:3000/items/${item._id}`,
      {
        ...item,
        completed: changes
      }).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  deleteItem(item: TodoItem) {
    return this.http.delete(`http://localhost:3000/items/${item._id}`).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }
}
