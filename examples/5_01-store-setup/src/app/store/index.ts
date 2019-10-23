import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { TodoListState } from 'src/app/store/todo-list/reducers';
import * as fromTodoListReducers from './todo-list/reducers';

export interface State {
  todoList: TodoListState,
}

export const reducers: ActionReducerMap<State> = {
  todoList: fromTodoListReducers.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
