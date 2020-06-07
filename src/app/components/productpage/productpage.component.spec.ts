import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpageComponent } from './productpage.component';
import { DataService } from 'src/app/services/data.service';
import { MockDataService } from 'src/app/services/MockDataService';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

describe('ProductpageComponent', () => {
  let component: ProductpageComponent;
  let fixture: ComponentFixture<ProductpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductpageComponent],
      imports: [HttpClientModule],
      providers: [
        ProductpageComponent,
        { provide: DataService, useClass: MockDataService },
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
});
