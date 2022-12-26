import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { EffectsModule } from '@ngrx/effects';

import { TodoItemComponent } from './todo-item.component';
import { TodoStoreService } from 'src/app/todo/store/services/todo-store.service';
import { TodoDialogComponent } from 'src/app/todo/components/todo-dialog/todo-dialog.component';
import { TodoInterface } from 'src/app/todo/models/todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoStoreService: TodoStoreService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatTooltipModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ],
      providers: [
        provideMockStore({}),
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {paramMap: convertToParamMap({id: 1})}}
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    todoStoreService = TestBed.inject(TodoStoreService);
    route = TestBed.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit(): should load correct data (different id)', () => {
    component['id'] = component['route'].snapshot.params?.id;
    spyOn<any>(component, 'subscribeData');
    spyOn(todoStoreService, 'getTodoItem');

    fixture.detectChanges();
    component.ngOnInit();

    expect(component['subscribeData']).toHaveBeenCalled();
    expect(todoStoreService.getTodoItem).toHaveBeenCalledWith(component['id']);
  });

  it('Should open the TodoDialogComponent in a MatDialog' , () => {
    const item: TodoInterface = {
      id: 1,
      label: 'label',
      description: 'description',
      category: 'category',
      done: false
    };

    spyOn(component.dialog, 'open');

    component.openTodoDialog(item);

    expect(component.dialog).toBeDefined();
    expect(component.dialog.open).toHaveBeenCalledWith(TodoDialogComponent, {
      width: '590px',
      data: item
    });
  });

  it('Should deleteTodo' , () => {
    const id = 1;

    spyOn(component['todoStoreService'], 'deleteTodoItem').and.callThrough();

    component.deleteTodo(id);

    expect(todoStoreService.deleteTodoItem).toHaveBeenCalledWith(id);
  });
});
