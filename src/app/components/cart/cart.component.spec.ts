import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/MockHttpService';
import { HeaderComponent } from '../header/header.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent, HeaderComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: HttpService, useClass: MockHttpService },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cart', () => {
    console.log(component);
    // expect(component.cart.length).toBeGreaterThanOrEqual(1);
  });
});
