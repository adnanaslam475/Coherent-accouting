import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSearchListComponent } from './items-search-list.component';

describe('ItemsSearchListComponent', () => {
  let component: ItemsSearchListComponent;
  let fixture: ComponentFixture<ItemsSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
