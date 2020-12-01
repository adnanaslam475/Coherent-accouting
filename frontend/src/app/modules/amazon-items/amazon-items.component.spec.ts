import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonItemsComponent } from './amazon-items.component';

describe('AmazonItemsComponent', () => {
  let component: AmazonItemsComponent;
  let fixture: ComponentFixture<AmazonItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
