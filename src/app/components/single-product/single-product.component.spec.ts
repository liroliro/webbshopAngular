import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductComponent } from './single-product.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('SingleProductComponent', () => {
  let component: SingleProductComponent;
  let fixture: ComponentFixture<SingleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleProductComponent],
      imports: [HttpClientModule, RouterModule.forRoot([])],
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

  it('should find one movie', () => {
    expect(component.currentMovie);
  });
});
