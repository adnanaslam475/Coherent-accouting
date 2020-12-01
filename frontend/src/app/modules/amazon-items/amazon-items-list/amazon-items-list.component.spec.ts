import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonItemsListComponent } from './amazon-items-list.component';

describe('AmazonItemsListComponent', () => {
  let component: AmazonItemsListComponent;
  let fixture: ComponentFixture<AmazonItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
