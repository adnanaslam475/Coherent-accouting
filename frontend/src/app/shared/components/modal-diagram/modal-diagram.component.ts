import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CHART_COLORS, CHART_OPTIONS } from '../../const/chart-colors.const';
import { Orders } from '../../interfaces/items.interface';
import { ChartColor, ChartData, ChartOptions } from './../../interfaces/chart.interface';

@Component({
  selector: 'app-modal-diagram',
  templateUrl: './modal-diagram.component.html',
  styleUrls: ['./modal-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDiagramComponent implements OnInit {
  public ordersList: Orders[];
  // Line options
  public lineChartData: ChartData[] = [{ data: [], label: 'Daily Sales' }];
  public lineChartLabels: string[];
  public lineChartOptions: any = CHART_OPTIONS;
  public lineChartColors: ChartColor[];
  public lineChartLegend: boolean;
  public lineChartType: string;
  public chartObject: { [index: string]: Orders };

  constructor(private dialogRef: MatDialogRef<ModalDiagramComponent>, @Inject(MAT_DIALOG_DATA) data: { orders: Orders[] }) {
    this.ordersList = data.orders;
    this.lineChartType = 'bar';
    this.lineChartLegend = true;
    this.lineChartColors = CHART_COLORS;
  }

  public ngOnInit(): void {
    if (this.ordersList && this.ordersList.length > 0) {
      this.setChartData('saleDate', this.ordersList);
    }
  }

  public save(): void {
    if (this.ordersList) {
      this.dialogRef.close({ data: this.ordersList });
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public setChartData(propertyName: string, ordersArray: Orders[]): { [index: string]: Orders } {
    this.chartObject = {};

    ordersArray.map((orders: Orders) => {
      const orderPropertyName: string = orders[propertyName];
      if (orderPropertyName in this.chartObject) {
        this.chartObject[orderPropertyName].duplicate = true;
        const quantity = -(-this.chartObject[orderPropertyName].quantityPurchased) + -(-orders.quantityPurchased);
        const price = -(-this.chartObject[orderPropertyName].transactionPrice) + -(-orders.transactionPrice);
        this.chartObject[orderPropertyName].quantityPurchased = quantity;
        this.chartObject[orderPropertyName].transactionPrice = price;
        this.lineChartData[0].data[this.lineChartData[0].data.length - 1] = quantity;
        orders.duplicate = true;
      } else {
        this.chartObject[orderPropertyName] = orders;
        this.lineChartData[0].data.push(-(-orders.quantityPurchased));
        this.chartObject[orderPropertyName].quantityPurchased = -(-orders.quantityPurchased);
        this.chartObject[orderPropertyName].transactionPrice = -(-orders.transactionPrice);
        delete orders.duplicate;
      }
    });

    this.lineChartLabels = Object.keys(this.chartObject);
    const maxNumber = Math.max(...this.lineChartData[0].data);
    this.lineChartOptions.scales.yAxes[0].ticks.max = maxNumber + 2;

    return this.chartObject;
  }
}
