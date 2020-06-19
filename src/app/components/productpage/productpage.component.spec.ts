import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpageComponent } from './productpage.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/MockHttpService';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

describe('ProductpageComponent', () => {
  let component: ProductpageComponent;
  let fixture: ComponentFixture<ProductpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductpageComponent, HeaderComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        DatePipe,
        ProductpageComponent,
        { provide: HttpService, useClass: MockHttpService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies', () => {
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].name).toContain('Star');
  });

  it('should add three movies to cart', () => {
    component.movies.forEach((m) => {
      component.addToCart(m);
    });

    expect(component.cart.length).toEqual(3);
  });
});
