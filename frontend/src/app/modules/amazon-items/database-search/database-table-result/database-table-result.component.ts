import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort, MatTableDataSource, Sort, MatDialogRef } from '@angular/material';
import { AmazonModalDisplayRankComponent } from 'app/shared/components/amazon-modal-display-rank/amazon-modal-display-rank.component';
import { sortAnimations } from '../../../../shared/animations/sort-animations';
import { AmazonDatabaseResult } from '../../../../shared/interfaces/amazon-items';
export type SortDirection = 'asc' | 'desc' | '';
@Component({
  selector: 'app-database-table-result',
  templateUrl: './database-table-result.component.html',
  styleUrls: ['./database-table-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    sortAnimations.indicator,
    sortAnimations.leftPointer,
    sortAnimations.rightPointer,
    sortAnimations.arrowOpacity,
    sortAnimations.arrowPosition,
    sortAnimations.allowChildren
  ]
})
export class DatabaseTableResultComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() result: AmazonDatabaseResult[];

  public PAGE_SIZE = 25;

  public dataSource;
  public displayedColumns: string[] = [
    'amazonImage',
    'amazonTitle',
    'sellerInfo',
    'amazonCategory',
    'amazonPrice',
    'profit',
    'numberOfAmazonSellers',
    'amazonRating',
    'amazonReviews',
    'estimatedSalesPerMonth',
    'fee'
  ];

  public selection = new SelectionModel<AmazonDatabaseResult>(true, []);
  public sortColumnsData: Sort;
  private arrowDirection: SortDirection = '';
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public el: ElementRef) {}

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AmazonDatabaseResult>(this.result);
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.scrollIntoView();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.result && changes.result.currentValue) {
      this.result = changes.result.currentValue;
      this.dataSource = new MatTableDataSource<AmazonDatabaseResult>(this.result);
      if (this.result.length === this.PAGE_SIZE) {
        this.scrollIntoView();
      }
    }
  }

  public scrollIntoView() {
    const offsetPosition = this.el.nativeElement.offsetTop - 76;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public sortData(sort: Sort): void {
    sort.direction.length > 0 ? (this.sortColumnsData = sort) : (this.sortColumnsData = null);

    const data = this.result.slice();
    if (!sort.active || sort.direction === '') {
      this.result = data;
      this.dataSource = new MatTableDataSource<AmazonDatabaseResult>(this.result);
      return;
    }

    this.result = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amazonPrice':
          return this.compare(+a.amazonPrice, +b.amazonPrice, isAsc);
        case 'profit':
          return this.compare(+a.profit, +b.profit, isAsc);
        case 'numberOfAmazonSellers':
          return this.compare(+a.numberOfAmazonSellers, +b.numberOfAmazonSellers, isAsc);
        case 'amazonRating':
          return this.compare(+a.amazonRating, +b.amazonRating, isAsc);
        case 'amazonReviews':
          return this.compare(+a.amazonReviews, +b.amazonReviews, isAsc);
        case 'estimatedSalesPerMonth':
          return this.compare(+a.estimatedSalesPerMonth, +b.estimatedSalesPerMonth, isAsc);
        case 'fee':
          return this.compare(+a.fee, +b.fee, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource<AmazonDatabaseResult>(this.result);
    this.updateArrowDirection();
  }

  public getArrowDirection(): string {
    return `${this.isSorted() ? 'active-' : ''}${this.arrowDirection}`;
  }

  private isSorted() {
    return (
      this.sortColumnsData &&
      this.sortColumnsData.active.length > 0 &&
      (this.sortColumnsData.direction === 'asc' || this.sortColumnsData.direction === 'desc')
    );
  }

  public updateArrowDirection() {
    this.arrowDirection = this.isSorted() ? this.sortColumnsData.direction : 'asc';
  }

  public getObjectKeys(amazonRanks): string[] {
    return Object.keys(amazonRanks);
  }

  public openCategoryDetails(e, amazonRanks): void {
    e.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    const data = Object.keys(amazonRanks).map((key, i) => `${i + 1}. ${key} (${amazonRanks[key]})`);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '45vw';
    dialogConfig.data = {
      amazonRankList: data,
      title: 'Categories'
    };

    const dialogRef: MatDialogRef<AmazonModalDisplayRankComponent> = this.dialog.open(AmazonModalDisplayRankComponent, dialogConfig);
  }

  private compare(a: number, b: number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
