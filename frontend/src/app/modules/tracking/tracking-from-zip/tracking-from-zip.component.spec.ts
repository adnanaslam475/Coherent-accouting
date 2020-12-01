import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingFromZipComponent } from './tracking-from-zip.component';

describe('TrackingFromZipComponent', () => {
  let component: TrackingFromZipComponent;
  let fixture: ComponentFixture<TrackingFromZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingFromZipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingFromZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
