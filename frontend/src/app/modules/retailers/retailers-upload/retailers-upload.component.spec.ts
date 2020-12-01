import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersUploadComponent } from './retailers-upload.component';

describe('RetailersUploadComponent', () => {
  let component: RetailersUploadComponent;
  let fixture: ComponentFixture<RetailersUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
