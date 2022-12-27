import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';

import { TodoFilterComponent } from './todo-filter.component';
import { TodoStoreService } from 'src/app/todo/store/services/todo-store.service';
import { TodoDialogComponent } from 'src/app/todo/components/todo-dialog/todo-dialog.component';

describe('TodoFilterComponent', () => {
  let component: TodoFilterComponent;
  let fixture: ComponentFixture<TodoFilterComponent>;
  let todoStoreService: TodoStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoFilterComponent ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ],
      providers: [
        provideMockStore({}),
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFilterComponent);
    component = fixture.componentInstance;
    todoStoreService = TestBed.inject(TodoStoreService);
    const control = new UntypedFormControl('');
    fixture.componentInstance.searchControl = control;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should setSearch' , () => {
    spyOn(component['todoStoreService'], 'filteredTodoList').and.callThrough();

    component.setSearch();

    expect(todoStoreService.filteredTodoList).toHaveBeenCalledWith(fixture.componentInstance.searchControl.value);
  });

  it('Should open the TodoDialogComponent in a MatDialog' , () => {
    spyOn<any>(component.dialog, 'open')
      .and
      .returnValue({afterClosed: () => of(true)});
    spyOn(todoStoreService, 'getTodoList').and.callThrough();

    component.openTodoDialog();

    expect(component.dialog).toBeDefined();
    expect(component.dialog.open).toHaveBeenCalledWith(TodoDialogComponent, {
      width: '590px'
    });
    expect(todoStoreService.getTodoList).toHaveBeenCalled();
  });
});
