## Getting items from database

You've posted your first item to database. This is great time to get the data from it!

Let's add method called `retrieveListFromDataBase` in which we will perform GET method.

```js
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe();
```

As you've probably noticed `url` part is also needed here and we subscribed response of this call. ALso we added `<TodoItem[]>` part which is telling that our response will have type `TodoItem[]`.

But before we'll move on we need to make changes in model. In DB each item has it's unique id (string) and we need to add it into our model.

In `todo-item.ts` simply add `_id: string;`:

```js
export interface TodoItem {
    _id?: string;
    title: string;
    completed?: boolean;
}
```

Now the most tricky part: how can we see the data in our rendered app?

We will setup whole integration by using `Subject` and `Observable` - do not worry, on next workshops we will explain it more.

For starters you may want to see in DevTools console what we actually receive.
To do this inside subscribe you may add `console.log()`:
```js
  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => console.log(response)
    );
  }
```

Now comes the time for a small explanation.

**Observables** provide us stream of information and with that we may define what app needs to do when new value is beeing received. This is great for refreshing our list each time we make any changes.
**Subject** will give us mechanism to emit new values into Observable.
One more time, we will explain it next time, now you may stay focused only on uderstanding http calls.
But you may also [watch video](https://www.youtube.com/watch?v=QHCjT3jRzB0) to have a snick-peak into what we are talking about.

Response from http call is already and Observable, that's more or less why we need to subcribe to it.

Okay, so we have values sended back from DB, you saw it in console. We need mechanism that will emit this data to component that wants to use it. And here Subject will come into action.

Lets create new Subject as property of service class:

```js
  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();

```

By using Subject mechanism of emiting next value we may now announce response we got from server:

```js
  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }
```
 Cool, we are emiting values, but how to see them in the app?
 Observable come to rescue. 
 Instead of sending back more or less static list of items we may now return to component an Observable of this list by simply converting Subject into Observable. *(when using localhost you've used property which was mutable, each time you've pushed something to an array it was mutaded and that's why you've seen update straight away)*
 
 ```js
   getTodoList() {
    return this.todoListSubject.asObservable();
  }
 ```
But component will not understand it now. We need to change also way of retrieving data by list manager.

In `list-manager.component.ts` you need to change `todoList` type into `Observable<TodoItem[]>` because now server returns and Observable of type `TodoItem[]`.
Since Observables may be understood as streams which are asynchronous we need to also change our template which wants to display our items.
To display values from Observable we need to use `async` pipe.

```html
    <div class="todo-app">
      <app-input-button-unit (submitItem)="addItem($event)"></app-input-button-unit>

      <ul *ngIf="todoList | async as todoItems">
        <li *ngFor="let todoItem of todoItems">
          <app-todo-item [item]="todoItem"
                         (remove)="removeItem($event)"
                         (update)="updateItem($event.item, $event.changes)"></app-todo-item>
        </li>
      </ul>
    </div>
```
Use `*ngIf` directive to display values only when we have something in `todoList`, add `async` pipe by putting `| async` (`|` means `pipe` in Angular). We will also use `as todoItems` to refer to this Observable inside list of its elements.

At this point adding items will not refresh your list automatically - that's because we haven't implemented anything that will inform our app that data has updated. You way use for that a lot of things like for example websocket, but to limit new information we will add some workaround. To each action (geting, deleting and editing list) we will also add retrieving data on success. It is simple:

```js
  addItem(item: TodoItem) {
    this.http.post('http://localhost:3000/items',
      JSON.stringify({title: item.title, completed: item.completed || false}),
      {headers: this.headers}).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }
```
Inside subscribe you may define what is happening when it was successful call, what to do when there was an error, what to do when call is completed. In code above we added information that when adding an item was a success we want to retrieve data again.

Now you may check if everything is now working as you want.