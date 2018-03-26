import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneUpcomingComponent } from './one-upcoming.component';

describe('OneUpcomingComponent', () => {
  let component: OneUpcomingComponent;
  let fixture: ComponentFixture<OneUpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneUpcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
