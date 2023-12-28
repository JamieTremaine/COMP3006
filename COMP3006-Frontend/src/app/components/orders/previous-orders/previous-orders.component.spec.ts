import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrdersComponent } from './previous-orders.component';

describe('OrdersComponent', () => {
  let component: PreviousOrdersComponent;
  let fixture: ComponentFixture<PreviousOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviousOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
