import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUserStatisticsComponent } from './item-user-statistics.component';

describe('ItemUserStatisticsComponent', () => {
  let component: ItemUserStatisticsComponent;
  let fixture: ComponentFixture<ItemUserStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemUserStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUserStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
