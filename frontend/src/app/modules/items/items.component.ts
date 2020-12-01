import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {
  public activeLink = 'route1';
  constructor() { }

  public ngOnInit() {
  }

}
