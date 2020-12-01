import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonItemsSavedSourceComponent } from './amazon-items-saved-source.component';

describe('AmazonItemsSavedSourceComponent', () => {
  let component: AmazonItemsSavedSourceComponent;
  let fixture: ComponentFixture<AmazonItemsSavedSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonItemsSavedSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonItemsSavedSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
