import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from 'app/service';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit{
  public activeLink = 'route1';
  public isEligible = false;
  constructor(private userService: UserService, private route: ActivatedRoute) {  }

  public ngOnInit(): void {
    this.isEligible = this.route.snapshot.data['userEligibility'].isEligible;
  }
}

@Injectable()
export class EligibilityResolver implements Resolve<any> {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getUserEligibility();
  }
}
