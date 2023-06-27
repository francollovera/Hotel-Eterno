import React from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

const ReservationCountChart = () => {
  const data = [
    { mes: 'Enero', cantidad: 10 },
    { mes: 'Febrero', cantidad: 15 },
    { mes: 'Marzo', cantidad: 8 },
    { mes: 'Abril', cantidad: 12 },
    { mes: 'Mayo', cantidad: 20 },
    // Agrega más datos para cada mes
  ];

  return (
    <RadarChart outerRadius={90} width={600} height={300} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="mes" />
      <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
      <Radar name="Cantidad" dataKey="cantidad" stroke="#8884d8" fill="#f97133" fillOpacity={0.6} />
    </RadarChart>
  );
}

export default ReservationCountChart;
