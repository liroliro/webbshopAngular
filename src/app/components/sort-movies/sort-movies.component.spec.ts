import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMoviesComponent } from './sort-movies.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { MockHttpService } from 'src/app/services/MockHttpService';
import { HttpService } from 'src/app/services/http.service';

describe('SortMoviesComponent', () => {
  let component: SortMoviesComponent;
  let fixture: ComponentFixture<SortMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortMoviesComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        HttpClientModule,
        DatePipe,
        { provide: HttpService, useClass: MockHttpService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
