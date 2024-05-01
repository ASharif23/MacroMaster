//PhysicalActivityChart.js
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const PhysicalActivityChart = ({ activity }) => {
  // Assuming `Activity` contains a `weeklyActivity` array with `{ day: string, minutes: number }` objects
  const data = activity || [];

  return (
    <BarChart
      width={670}
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
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="minutes" fill="#82ca9d" />
    </BarChart>
  );
};

export default PhysicalActivityChart;