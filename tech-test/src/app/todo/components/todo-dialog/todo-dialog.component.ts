import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TodoInterface } from '../../models/todo.model';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {
  public todoForm: FormGroup;
  public categories: string[] = ['house', 'bureaucracy'];

  constructor(
    public dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoInterface,
    private fb: FormBuilder
    ) {}

  public ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.todoForm.patchValue(this.data);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submitForm(): void {
    if (this.todoForm.invalid) {
      return;
    }
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      label: '',
      description: '',
      category: ['', Validators.required]
    })
  }

}
