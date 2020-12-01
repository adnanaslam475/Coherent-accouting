import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  ConfigService,
  UserService
} from '../../../service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  // TODO define user interface
  user: any;
  @Output() logoutClicked: EventEmitter<boolean> = new EventEmitter();

  constructor(private config: ConfigService, private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.userService.currentUser = null;
      this.logoutClicked.emit(false);
      this.router.navigate(['/login']);
    });
  }
}
