# Communicating with the server

Let's add in the code needed to convert from using local storage to the server. Angular has all the pieces you need to make HTTP calls built in. Since we followed good coding practices by creating a `todo-list`, a service solely responsible for todo list item management, the only place where we have to make any code changes is inside that service.

## Adding HttpModule

For performing HTTP calls in Angular we need to use `HttpModule` which offers a simplified HTTP client library. 

We need to import this module in our `app.module.ts` so it may be used in the application.

```ts
...
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InputButtonUnitComponent,
    TodoItemComponent,
    ListManagerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Now we can inject the built in`HttpClient` library in `todo-list.service.ts`. We'll ask for an instance of the `HttpClient` service in the constructor, and make sure to import the class.

```ts
  constructor(private storageService: StorageService,
              private http: HttpClient) {
  }
```

## Saving data in the database

When saving data we want to create it, so we will use the **POST** REST method.

In your `addItem` method we want to add the code to POST an item by using `HttpClient`'s built in `post` method.

```ts
this.http.post();
```

The `post` method requires 2 parameters, the **url** and the **body**. Let's start with the **url**.

### Server url

The **url** is the address of the server so the `HttpClient` knows where to POST the data. The **url** includes a **host** and a **path**.  Since we are running the server locally, the server's host address is "localhost:3000". 

The path for a url usually includes a string for the specific type of data we are interacting with. We named the path "items" and we configured this as part of the provided server setup. 

The full url to the server is the combination of the host and the path, which for our case, is `http://localhost:3000/items`.

### POST body

Now we need to add the data, or the **body**, to the request. We want to pass in the todo item.

```ts
this.http.post('http://localhost:3000/items', item);
```

### Making the call
The HttpClient library requires us to subscribe to the output of the `post()` call in order to trigger calling the server. We can do so by adding `.subscribe()` at the end of call.

```ts
  addItem(item: TodoItem) {
    this.http.post('http://localhost:3000/items', item)
    .subscribe();
  }
```

We now have a working call to the local server! Try adding a todo item in your app. You can see log output in your local server console and feel free to check the content of your list items in MongoDB Atlas.
