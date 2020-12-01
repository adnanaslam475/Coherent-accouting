import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ItemsService } from '../../../service/items/items.service';
import { ItemUserStatistics } from '../../../shared/interfaces/item-user-statistics.interface';
import { Item } from '../../../shared/interfaces/items.interface';

@Component({
  selector: 'app-item-user-statistics',
  templateUrl: './item-user-statistics.component.html',
  styleUrls: ['./item-user-statistics.component.scss']
})
export class ItemUserStatisticsComponent implements OnInit {
  @Input() public retailerUserName: string;
  @Input() public totalPrice: number;
  @Input() public avgPrice: number;
  @Input() public totalItems: number;
  public userStatistics: ItemUserStatistics;
  constructor(public itemService: ItemsService) {
    this.totalPrice = 0;
    this.avgPrice = 0;
  }

  ngOnInit() {
    this.itemService.getUserStatistic(this.retailerUserName)
      .subscribe((stat: ItemUserStatistics) => {
        this.userStatistics = stat;
      });
  }

  hasUserStatistics(): boolean {
    return this.userStatistics !== undefined;
  }

  // ngOnChanges(value: any) {
    // if (this.itemList && this.itemList.length > 0) {
    //   this.calculatePrice();
    // }
  //}

  // private calculatePrice() {
  //   for (let i = 0; i < this.itemList.length; i++) {
  //     this.totalPrice += this.itemList[i].price;
  //   }
  // }

}
