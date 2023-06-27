import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PaymentStatusChart = () => {
  const data = [
    { estado: 'Pagado', cantidad: 5 },
    { estado: 'No pagado', cantidad: 3 },
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie dataKey="cantidad" nameKey="estado" data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default PaymentStatusChart;