import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubs: Subscription;
  private activatedRouteSubs: Subscription;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.activatedRouteSubs = this.activatedRoute
      .queryParams
      .subscribe(
        queryParams => {
          if (queryParams.referrer) {
            localStorage.setItem('referrer', queryParams.referrer);
          }
        }
      );

    this.routerSubs = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        const title = event['title'];
        if ('Login' === title) {
          // this.isAuthorized = true;
          this.router.navigate(['/login']);
        }
        if ('Signup' === title) {
          const referrer = localStorage.getItem('referrer');
          if (referrer !== null) {
            this.router.navigate(['/signup'], {queryParams: {referrer}});
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSubs) {
      this.routerSubs.unsubscribe();
    }
    if (this.activatedRouteSubs) {
      this.activatedRouteSubs.unsubscribe();
    }
  }
}
