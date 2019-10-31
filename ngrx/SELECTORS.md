## Selectors

You may now also implement selector so instead of displaing data wtored in DB you will display data from store. 

Are you able to create selector based on information provided on [NgRx Docs](https://ngrx.io/guide/store/selectors)?

:hourglass_flowing_sand::dancer::hourglass_flowing_sand::dancer::hourglass_flowing_sand::dancer::hourglass_flowing_sand::dancer::hourglass_flowing_sand::dancer::hourglass_flowing_sand:

I bet you've wrote something like this:
```ts
export const getRootState = (state: State) => state.todoList;

export const getTodoItems = createSelector(
  getRootState,
  (state: TodoListState) => state.items
);
```

## Displaying data from store

Since our selector is ready you may now retrieve items from store.
Where do you want to implement the solution?

Is it `todo-list-service`? We've chosen this file :blush:

The idea is again simple. You need to initialize the store in constructor.
Then you may use your selector by calling `select` method on store.
Recommended way to import selectors looks like that: 

```ts
import * as fromTodoListSelectors from '../store/todo-list/selectors';
```

Now mentioned `select` method:

```ts
this.store.select(fromTodoListSelectors.getTodoItems)
```

It's returning an Observable with todo list items from store, so you may easily subscribe to it and do not worry about calling it again every time data will update :blush:

Same as with retrieving info from Data Base you may now do it from store:

```ts
  retrieveListFromStore() {
    this.store.select(fromTodoListSelectors.getTodoItems).subscribe(value => this.todoListSubject.next(value));
  }
```

You may now comment or remove code calling to MongoDB and check if your app is able to have your todo list inside store :blush:

> As your next step or your homework you may add user information related store, good luck! :muscle:
