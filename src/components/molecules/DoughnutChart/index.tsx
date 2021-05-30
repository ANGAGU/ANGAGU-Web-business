import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

type ChartProps = {
  data: Chart.ChartData | ((canvas: HTMLCanvasElement) => Chart.ChartData);
};

const DoughnutChart: React.FC<ChartProps> = ({ data }) => <Doughnut type="doughnut" data={data} />;

export default DoughnutChart;
