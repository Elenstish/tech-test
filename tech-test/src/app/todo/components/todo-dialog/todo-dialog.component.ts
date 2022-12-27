import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import * as moment from 'moment';

import { TodoInterface } from '../../models/todo.model';
import { TodoStoreService } from '../../store/services/todo-store.service';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoDialogComponent implements OnInit {
  public todoForm: UntypedFormGroup;
  public categories: string[] = ['house', 'bureaucracy'];

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoInterface,
    private todoStoreService: TodoStoreService,
    private fb: UntypedFormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();

    if (this.data) {
      this.patchData();
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submitForm(): void {
    if (this.todoForm.invalid) {
      return;
    }

    const formValue = this.todoForm.getRawValue();
    formValue.done = (formValue.done) ? moment(formValue.done).format('DD-MM-YYYY') : false;

    if (this.data) {
      this.todoStoreService.patchTodo(formValue);
    } else {
      this.todoStoreService.createTodo(formValue);
    }

    this.closeDialogOnSuccessAction();
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      id: 0,
      label: '',
      description: '',
      category: ['', Validators.required],
      done: null
    });
  }

  private closeDialogOnSuccessAction(): void {
    this.todoStoreService.createTodoSuccessAction$()
      .pipe(
          filter(Boolean),
          take(1)
      )
      .subscribe(() => this.dialogRef.close(true));

    this.todoStoreService.patchTodoSuccessAction$()
      .pipe(
          filter(Boolean),
          take(1)
      )
      .subscribe(() => this.cancel());
  }

  private patchData(): void {
    this.todoForm.patchValue(this.data);

    if (typeof this.data.done === 'string') {
      const parts = this.data.done.split('-');
      const newDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

      this.todoForm.controls['done'].patchValue(newDate.toISOString());
    } else {
      this.todoForm.controls['done'].patchValue(null);
    }
  }
}
