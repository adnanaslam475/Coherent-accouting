import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersImportComponent } from './retailers-import.component';

describe('RetailersImportComponent', () => {
  let component: RetailersImportComponent;
  let fixture: ComponentFixture<RetailersImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
