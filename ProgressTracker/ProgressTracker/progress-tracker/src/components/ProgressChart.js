import React from 'react';
import { Line } from 'react-chartjs-2';

const ProgressChart = ({ data }) => {
  // Prepare your chart data here
  return <Line data={data} />;
};

export default ProgressChart;