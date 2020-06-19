import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AdminComponent } from './admin.component';
import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/MockHttpService';
import { HeaderComponent } from '../header/header.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent, HeaderComponent],
      imports: [HttpClientModule],
      providers: [
        DatePipe,
        AdminComponent,
        { provide: HttpService, useClass: MockHttpService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all orders', () => {
    expect(component.orders.length).toEqual(2);
  });

  it('should remove one of the orders', () => {
    component.removeOrder(1);
    expect(component.orders.length).toEqual(1);
  });
});
