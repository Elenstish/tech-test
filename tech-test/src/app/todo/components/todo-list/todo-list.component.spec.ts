import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoListComponent } from './todo-list.component';
import { TodoStoreService } from 'src/app/todo/store/services/todo-store.service';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoStoreService: TodoStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [
        MatListModule,
        MatTooltipModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoStoreService = TestBed.inject(TodoStoreService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit(): should call all required methods', () => {
    spyOn(todoStoreService, 'getTodoList');
    spyOn<any>(component, 'subscribeData');

    component.ngOnInit();


    expect(todoStoreService.getTodoList).toHaveBeenCalled();
    expect(component['subscribeData']).toHaveBeenCalled();
  });
});
