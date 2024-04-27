//LifetimeWeightLossChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LifetimeWeightLossChart = ({ progress }) => {
  // Assuming `Progress` contains a `weightLossOverTime` array with `{ week: number, weight: number }` objects
  const data = progress || [];

  const minYValue = progress && progress.length > 0
    ? Math.min(...progress.map(item => item.weight))
    : 0;

  return (
    <LineChart
      width={650}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis domain={[minYValue > 10 ? minYValue - 10 : minYValue, 'auto']} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    </LineChart>
  );
};

export default LifetimeWeightLossChart;