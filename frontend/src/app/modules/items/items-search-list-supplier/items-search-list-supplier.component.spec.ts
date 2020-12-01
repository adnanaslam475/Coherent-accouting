import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSearchListSupplierComponent } from './items-search-list-supplier.component';

describe('ItemsSearchListSupplierComponent', () => {
  let component: ItemsSearchListSupplierComponent;
  let fixture: ComponentFixture<ItemsSearchListSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSearchListSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSearchListSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
