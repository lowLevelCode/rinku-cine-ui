import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCloseDialogComponent } from './header-close-dialog.component';

describe('HeaderCloseDialogComponent', () => {
  let component: HeaderCloseDialogComponent;
  let fixture: ComponentFixture<HeaderCloseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCloseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
