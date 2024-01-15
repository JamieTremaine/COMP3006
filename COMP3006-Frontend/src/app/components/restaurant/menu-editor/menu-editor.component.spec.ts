import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditorComponent } from './menu-editor.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('MenuEditorComponent', () => {
  let component: MenuEditorComponent;
  let fixture: ComponentFixture<MenuEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
