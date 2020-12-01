export interface ChartData {
  data: number[];
  label: string;
}

export interface ChartColor {
  backgroundColor: string;
  borderColor: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
}

export interface ChartOptions {
  responsive?: boolean;
  scaleOverride?: boolean;
  scaleSteps?: number;
  scaleStepWidth?: number;
  scaleStartValue?: number;
  scales?: ChartOptions;
}

export interface ChartOptions {
  yAxes?: { ticks: ChartTicks[] };
  xAxes?: { ticks: ChartTicks[] };
}

export interface ChartTicks {
  min?: number;
  stepValue?: number;
  max?: number;
}
