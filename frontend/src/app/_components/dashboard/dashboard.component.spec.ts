import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  /* beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); */

});
