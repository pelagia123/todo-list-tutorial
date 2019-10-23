import { TodoItem } from 'src/app/interfaces/todo-item';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodoListActions from './actions';

export interface TodoListState {
  items: TodoItem[];
}

export const initialState: TodoListState = {
  items: []
};

const todoListReducer = createReducer(
  initialState,
  on(TodoListActions.setNewItem, (state, {item}) => ({...state, items: state.items.concat(item)})),
  on(TodoListActions.deleteTodoItem, (state, {id}) => ({...state, items: removeItemFromList(state.items, id)})),
  on(TodoListActions.changeCompletedStatus, (state, {id, completed}) => ({
    ...state,
    items: markListElementAsCompleted(state.items, id, completed)
  }))
);


function removeItemFromList(list: TodoItem[], id: string): TodoItem[] {
  return list.filter((element) => {
    return element._id !== id
  })
}

function markListElementAsCompleted(list: TodoItem[], id: string, completed: boolean): TodoItem[] {
  return list.map(value => {
    if (value._id === id) {
      return {
        ...value,
        completed: completed
      }
    } else {
      return value
    }
  })
}

export function reducer(state: TodoListState | undefined, action: Action) {
  return todoListReducer(state, action);
}
