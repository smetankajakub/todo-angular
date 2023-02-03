import { Injectable } from '@angular/core';

import { mergeMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodolistActions from './todolists.actions';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class TodoListsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadAllTodoLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodolistActions.loadAllTodoLists),
      mergeMap(() =>
        this.apiService.getAllTodoLists().pipe(
          map((todolists) => {
            return TodolistActions.loadAllTodoListSuccess({ todolists });
          })
        )
      )
    );
  });
}
