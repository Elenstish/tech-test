import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoListComponent } from './components/todo-list/todo-list.component';


const myHeroRoutes: Routes = [
    {
        path: '',
        component: TodoListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(myHeroRoutes)],
    exports: [RouterModule]
})

export class TodoRoutingModule {}
