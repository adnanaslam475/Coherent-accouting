import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonItemsSavedListComponent } from './amazon-items-saved-list.component';

describe('AmazonItemsSavedListComponent', () => {
  let component: AmazonItemsSavedListComponent;
  let fixture: ComponentFixture<AmazonItemsSavedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmazonItemsSavedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonItemsSavedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
