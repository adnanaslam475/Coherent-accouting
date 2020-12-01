import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  constructor() { }
  @Input() public cardTitle: string;
  @Input() public cardValue: string;
  @Input() public cardIcon: string;
  @Input() public cardIconColorClass: string;
  @Input() public cardFooterText: string;
  @Input() public cardFooterIcon: string;
  @Input() public showValue: boolean;

  ngOnInit() {
  }

}
