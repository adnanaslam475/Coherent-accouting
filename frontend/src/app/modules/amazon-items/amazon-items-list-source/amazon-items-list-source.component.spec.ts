import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonListPrimeComponent } from './amazon-items-list-source.component';

describe('AmazonListPrimeComponent', () => {
  let component: AmazonListPrimeComponent;
  let fixture: ComponentFixture<AmazonListPrimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonListPrimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonListPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
