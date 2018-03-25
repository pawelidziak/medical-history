import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsBarLineComponent } from './events-bar-line.component';

describe('EventsBarLineComponent', () => {
  let component: EventsBarLineComponent;
  let fixture: ComponentFixture<EventsBarLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsBarLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsBarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
