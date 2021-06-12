import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

type ChartProps = {
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
  options?: Chart.ChartOptions;
};

const LineChart: React.FC<ChartProps> = ({ data, options }) => (
  <Line type="line" data={data} options={options} />
);

export default LineChart;
