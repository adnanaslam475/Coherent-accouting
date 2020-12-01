import { Component, Input, Output, EventEmitter  } from '@angular/core';

export class CategoryItem {
  title: string;
  iconClass: string;
  value: string;
}

@Component({
  selector: 'top-item',
  templateUrl: './top-item.component.html',
  styleUrls: ['./top-item.component.scss']
})
export class TopItemComponent {
  @Input()
  public item: any;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
