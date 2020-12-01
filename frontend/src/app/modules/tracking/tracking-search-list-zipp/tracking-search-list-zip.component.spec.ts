import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingSearchListZipComponent } from './tracking-search-list-zip.component';

describe('TrackingSearchListZipComponent', () => {
  let component: TrackingSearchListZipComponent;
  let fixture: ComponentFixture<TrackingSearchListZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingSearchListZipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingSearchListZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
