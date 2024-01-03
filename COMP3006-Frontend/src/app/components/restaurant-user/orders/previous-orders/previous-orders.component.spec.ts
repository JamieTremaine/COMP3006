import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrdersComponent } from './previous-orders.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('PreviousOrdersComponent', () => {
  let component: PreviousOrdersComponent;
  let fixture: ComponentFixture<PreviousOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviousOrdersComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
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
