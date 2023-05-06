import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ value1, value2, value3 }) => {
  const data = {
    labels: ['Value 1', 'Value 2', 'Value 3'],
    datasets: [
      {
        data: [value1, value2, value3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;