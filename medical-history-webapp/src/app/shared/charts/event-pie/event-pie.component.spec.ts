import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPieComponent } from './event-pie.component';

describe('EventPieComponent', () => {
  let component: EventPieComponent;
  let fixture: ComponentFixture<EventPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
