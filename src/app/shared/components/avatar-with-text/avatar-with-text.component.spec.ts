import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWithTextComponent } from './avatar-with-text.component';

describe('AvatarWithTextComponent', () => {
  let component: AvatarWithTextComponent;
  let fixture: ComponentFixture<AvatarWithTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarWithTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
