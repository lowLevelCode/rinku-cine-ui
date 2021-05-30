import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateEmployeeComponent } from './edit-create-employee.component';

describe('EditCreateEmployeeComponent', () => {
  let component: EditCreateEmployeeComponent;
  let fixture: ComponentFixture<EditCreateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
