import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSearchListComponent } from './tracking-search-list.component';

describe('TrackingSearchListComponent', () => {
  let component: TrackingSearchListComponent;
  let fixture: ComponentFixture<TrackingSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
