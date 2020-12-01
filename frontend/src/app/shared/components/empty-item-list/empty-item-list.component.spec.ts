import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyItemListComponent } from './empty-item-list.component';

describe('EmptyItemListComponent', () => {
  let component: EmptyItemListComponent;
  let fixture: ComponentFixture<EmptyItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
