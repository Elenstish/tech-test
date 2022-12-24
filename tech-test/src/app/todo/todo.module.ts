import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoRoutingModule } from './todo.routing-module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoDialogComponent } from './components/todo-dialog/todo-dialog.component';
import { TodoStateName } from 'src/app/todo/store/models/todo-state.model';
import { todoReducers } from 'src/app/todo/store/reducers/todo-state.reducer';
import { TodoEffects } from 'src/app/todo/store/effects/todo.effects';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFilterComponent,
    TodoItemComponent,
    TodoDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TodoRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    StoreModule.forFeature(TodoStateName, todoReducers),
    EffectsModule.forFeature([TodoEffects])
  ]
})
export class TodoModule { }
