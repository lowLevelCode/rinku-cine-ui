import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaMovimientosComponent } from './captura-movimientos.component';

describe('CapturaMovimientosComponent', () => {
  let component: CapturaMovimientosComponent;
  let fixture: ComponentFixture<CapturaMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaMovimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
