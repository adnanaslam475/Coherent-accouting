import { Component, Input } from '@angular/core';

@Component({
  selector: 'items-card',
  templateUrl: './items-card.component.html',
  styleUrls: ['./items-card.component.scss']
})
export class ItemsCardComponent {
  @Input() public cardTitle: string;
  @Input() public cardValue: string;
  @Input() public cardIcon: string;
  @Input() public cardIconColorClass: string;
  @Input() public cardFooterText: string;
  @Input() public cardFooterIcon: string;
  @Input() public showValue: boolean;

  constructor() {}
}
