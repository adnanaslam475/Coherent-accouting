import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersFormComponent } from './retailers-form.component';

describe('RetailersFormComponent', () => {
  let component: RetailersFormComponent;
  let fixture: ComponentFixture<RetailersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
