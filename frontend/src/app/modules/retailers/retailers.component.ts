import { Component, OnInit } from '@angular/core';
import { RetailersService } from '../../service/retailers/retailers.service';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.css']
})
export class RetailersComponent implements OnInit {
  public activeLink = 'route1';
  constructor(
    private retailersService: RetailersService
  ) { }

  ngOnInit() {
  }


}
