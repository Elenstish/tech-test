import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { TodoDialogComponent } from './todo-dialog.component';
import { TodoStoreService } from 'src/app/todo/store/services/todo-store.service';

describe('TodoDialogComponent', () => {
  let component: TodoDialogComponent;
  let fixture: ComponentFixture<TodoDialogComponent>;
  let todoStoreService: TodoStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoDialogComponent ],
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
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
    fixture = TestBed.createComponent(TodoDialogComponent);
    component = fixture.componentInstance;
    todoStoreService = TestBed.inject(TodoStoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOn<any>(component, 'initForm').and.returnValue(null);
      spyOn<any>(component, 'patchData').and.returnValue(null);
    });

    it('should call required methods', () => {
      component.ngOnInit();

      expect(component['initForm']).toHaveBeenCalled();
    });

    it('should call patchData, if data exist', () => {
      component.ngOnInit();

      expect(component['patchData']).toHaveBeenCalledWith();
    });

    it('should NOT call patchData, if no data', () => {
      component.data = undefined;

      component.ngOnInit();

      expect(component['patchData']).not.toHaveBeenCalled();
    });
  });
});
