import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../../service/user.service';
import { Affiliate, AffiliateInfo, AffiliateUrl } from '../../shared/interfaces/affiliate-program.interface';

@Component({
  selector: 'app-affiliate-program',
  templateUrl: './affiliate-program.component.html',
  styleUrls: ['./affiliate-program.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AffiliateProgramComponent implements OnInit {
  public refUrl: string;
  public affiliateInfo: AffiliateInfo;
  public displayedColumns = ['id', 'username', 'registrationDate', 'paidForCurrentMonth'];
  public dataSource: MatTableDataSource<Affiliate>;

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.getRefUrl();
    this.getAffiliateInfo();
  }

  public copyInputMessage(inputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  private getRefUrl(): void {
    this.userService.generateAffiliateLink().subscribe((result: AffiliateUrl) => (this.refUrl = result.refUrl));
  }

  private getAffiliateInfo(): void {
    this.userService.getAffiliateInformation().subscribe((result: AffiliateInfo) => {
      this.affiliateInfo = result;
      this.dataSource = new MatTableDataSource<Affiliate>(result.affiliates);
    });
  }
}
