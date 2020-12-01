import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonItemsFormComponent } from './amazon-items-form.component';

describe('AmazonItemsFormComponent', () => {
  let component: AmazonItemsFormComponent;
  let fixture: ComponentFixture<AmazonItemsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonItemsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
