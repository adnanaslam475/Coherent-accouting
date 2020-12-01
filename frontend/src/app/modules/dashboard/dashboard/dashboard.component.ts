import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service';
import { UserStatistics } from '../../../shared/interfaces/user-statistics';
import { AffiliateInfo } from 'app/shared/interfaces/affiliate-program.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userStatistics: UserStatistics;
  public affiliateInfo: AffiliateInfo;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDashboardInfo();
  }

  hasUserStatistics(): boolean {
    return this.userStatistics !== undefined;
  }

  private getDashboardInfo() {
    this.userService.getDashboardInfo().subscribe(statistics => {
      this.userStatistics = statistics;
    });
  }
}
