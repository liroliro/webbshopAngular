import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductComponent } from './single-product.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/MockHttpService';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';

describe('SingleProductComponent', () => {
  let component: SingleProductComponent;
  let fixture: ComponentFixture<SingleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductComponent, HeaderComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        DatePipe,
        SingleProductComponent,
        { provide: HttpService, useClass: MockHttpService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movie', () => {
    expect(component.currentMovie.name).toContain('Return');
  });

  it('should add one product to the cart', () => {
    component.cart = [];
    component.addToCart(component.currentMovie);

    expect(component.cart.length).toEqual(1);
  });
});
