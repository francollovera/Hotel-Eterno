import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CostDistributionChart = () => {
  const data = [
    { reserva: 1, costo: 1250 },
  { reserva: 2, costo: 1500 },
  { reserva: 3, costo: 900 },
  { reserva: 4, costo: 1800 },
    // Agrega más datos para cada reserva
  ];

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="reserva" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="costo" stroke="#8884d8" />
    </LineChart>
  );
}

export default CostDistributionChart;