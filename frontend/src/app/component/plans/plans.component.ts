import { Component, OnInit, Injectable } from '@angular/core';
import { Plans, PlansProperies } from 'app/shared/interfaces/plans';
import { UserService } from '../../service';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  public plans1: Plans[] = [];
  public plans2: Plans[] = [];
  public plans: Plans[] = [];

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  public plansProperties: PlansProperies[] = [
    {
      name: 'Ebay competitor research',
      property: 'ebaySubscription'
    },
    {
      name: 'Tracking Generator',
      property: 'trackingSubscription'
    },
    {
      name: 'Amazon scout',
      property: 'amazonSubscription'
    }
  ];
  

  public ngOnInit() {
    this.plans = this.route.snapshot.data['plans'];
    this.populatePlans();
  }

  private populatePlans(): void {

    for(var i = 0;i<6;i++) {    
      this.plans1.push(this.plans[i]);
    }

    for(var i = 6;i<this.plans.length;i++) {   
      this.plans2.push(this.plans[i]); 
    }
  }
}



@Injectable()
export class ContactResolve implements Resolve<Plans[]> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService.getPlans();
  }
}
