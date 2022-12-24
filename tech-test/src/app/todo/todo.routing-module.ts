import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';


const Routes: Routes = [
    {
        path: '',
        component: TodoListComponent
    },
    {
      path: ':id',
      component: TodoItemComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(Routes)],
    exports: [RouterModule]
})

export class TodoRoutingModule {}
