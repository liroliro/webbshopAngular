import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent, HeaderComponent],
      providers: [FormBuilder, HttpClient, HttpHandler, DatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(() => {}));
});
