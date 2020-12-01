import { ChartColor } from '../interfaces/chart.interface';
export const CHART_COLORS: ChartColor[] = [
  {
    // grey
    backgroundColor: 'rgba(3,165,219,1)',
    borderColor: 'rgba(18,141,129,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  {
    // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];

export const CHART_OPTIONS: any = {
  responsive: true,
  scaleOverride: true,
  scaleSteps: 1,
  scaleStepWidth: 180,
  scaleStartValue: 1080,
  scales: {
    yAxes: [{ ticks: { min: 0, stepValue: 1, max: 9 } }]
  }
};
