import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amazon-items',
  templateUrl: './amazon-items.component.html',
  styleUrls: ['./amazon-items.component.scss']
})
export class AmazonItemsComponent implements OnInit {
  public activeLink = 'route1';
  constructor() { }

  ngOnInit() {
  }

}
