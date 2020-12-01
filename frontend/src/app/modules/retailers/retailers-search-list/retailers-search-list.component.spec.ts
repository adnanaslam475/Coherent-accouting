import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersSearchListComponent } from './retailers-search-list.component';

describe('RetailersSearchListComponent', () => {
  let component: RetailersSearchListComponent;
  let fixture: ComponentFixture<RetailersSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
