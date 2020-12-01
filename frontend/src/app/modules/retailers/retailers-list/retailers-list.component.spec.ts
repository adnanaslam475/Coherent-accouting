import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailersListComponent } from './retailers-list.component';

describe('RetailersListComponent', () => {
  let component: RetailersListComponent;
  let fixture: ComponentFixture<RetailersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
