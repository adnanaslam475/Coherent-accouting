import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { LoginGuard } from 'app/guard';
// import { ValidateAllSubscriptionsGuard } from 'app/guard/validate-all-subscriptions.guard';
// import { ValidateAmazonSubscriptionGuard } from 'app/guard/validate-amazon-subscription.guard';
// import { ValidateEbaySubscriptionGuard } from 'app/guard/validate-ebay-subscription.guard';
// import { ValidateTrackingSubscriptionGuard } from 'app/guard/validate-tracking-subscription.guard';
import { AmazonCategoryItemsListComponent } from 'app/modules/amazon-items/amazon-items-categories/amazon-category-items-list.component';
import { DatabaseSearchComponent } from 'app/modules/amazon-items/database-search/database-search.component';
import { BaMenuService } from 'app/theme';
import { AffiliateProgramComponent } from '../affiliate-program/affiliate-program.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { MyPlansComponent } from '../my-plans/my-plans.component';
import { VideoLessonsComponent } from '../video-lessons/video-lessons.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private _pagesMenu = [
    {
      path: 'system',
      children: [
        {
          path: 'dashboard',
          loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Dashboard',
              icon: 'fa fa-home',
              selected: false,
              expanded: false,
              order: 0,
              hidden: false
            }
          }
        },
        {
          path: '',
          data: {
            menu: {
              title: 'Ebay Search',
              icon: 'fa fa-search',
              selected: false,
              expanded: false,
              order: 1,
              hidden: false
            }
          },
          children: [
            {
              path: 'retailers',
              loadChildren: 'app/modules/retailers/retailers.module#RetailersModule',
              canActivate: [LoginGuard],
              data: {
                menu: {
                  title: 'Search For Competitors',
                  order: 1,
                  pathMatch: 'partial'
                }
              }
            },
            {
              path: 'items',
              loadChildren: 'app/modules/items/items.module#ItemsModule',
              canActivate: [LoginGuard],
              data: {
                menu: {
                  title: 'Competitor Research',
                  selected: false,
                  expanded: false,
                  order: 2,
                  hidden: false,
                  pathMatch: 'partial'
                }
              }
            }
          ]
        },
        {
          path: 'tracking',
          loadChildren: 'app/modules/tracking/tracking.module#TrackingModule',
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Tracking Generator',
              icon: 'fa fa-truck',
              selected: false,
              expanded: false,
              order: 3,
              hidden: false,
              pathMatch: 'partial'
            }
          }
        },
        {
          path: '',
          data: {
            menu: {
              title: 'Amazon Search',
              icon: 'fa fa-search',
              selected: false,
              expanded: false,
              order: 4,
              hidden: false
            }
          },
          children: [
            {
              path: 'amazon-items',
              loadChildren: 'app/modules/amazon-items/amazon-items.module#AmazonItemsModule',
              canActivate: [LoginGuard],
              data: {
                menu: {
                  title: 'Live Amazon Search',
                  selected: false,
                  expanded: false,
                  order: 0,
                  hidden: false,
                  pathMatch: 'partial'
                }
              }
            },
            {
              path: 'categories',
              component: AmazonCategoryItemsListComponent,
              canActivate: [LoginGuard],
              data: {
                menu: {
                  title: '1 000 000+ Top Items',
                  selected: false,
                  expanded: false,
                  order: 1,
                  hidden: false
                }
              }
            },
            {
              path: 'database-search',
              component: DatabaseSearchComponent,
              canActivate: [LoginGuard],
              data: {
                menu: {
                  title: 'Database Search',
                  selected: false,
                  expanded: false,
                  order: 2,
                  hidden: false
                }
              }
            }
          ]
        },
        {
          path: 'video-lessons',
          component: VideoLessonsComponent,
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Video Lessons',
              icon: 'fa fa-video-camera',
              selected: false,
              expanded: false,
              order: 5,
              hidden: false
            }
          }
        },
        {
          path: 'affiliate-program',
          component: AffiliateProgramComponent,
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Affiliate program',
              icon: 'fa fa-users',
              selected: false,
              expanded: false,
              order: 6,
              hidden: false
            }
          }
        },
        {
          path: 'my-plans',
          component: MyPlansComponent,
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'My Plans',
              icon: 'fa fa-dollar',
              selected: false,
              expanded: false,
              order: 7,
              hidden: false
            }
          }
        },
        {
          path: 'settings',
          loadChildren: 'app/modules/settings/settings.module#SettingsModule',
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Settings',
              icon: 'socicon ion-gear-a',
              selected: false,
              expanded: false,
              order: 8,
              hidden: false
            }
          }
        },
        {
          path: 'contacts',
          component: ContactsComponent,
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Contacts',
              icon: 'fa fa-phone-square',
              selected: false,
              expanded: false,
              order: 9,
              hidden: false
            }
          }
        },
        {
          path: 'tickets',
          loadChildren: 'app/modules/tickets/tickets.module#TicketsModule',
          canActivate: [LoginGuard],
          data: {
            menu: {
              title: 'Tickets',
              icon: 'fa fa-pencil-square-o',
              selected: false,
              expanded: false,
              order: 10,
              hidden: false
            }
          }
        }
      ]
    }
  ];
  constructor(private router: Router, private menuService: BaMenuService) { }

  public ngOnInit() {
    this.menuService.updateMenuByRoutes(<Routes>this._pagesMenu);
  }
}
