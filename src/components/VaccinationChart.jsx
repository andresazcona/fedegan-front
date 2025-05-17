import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function getLastTenMonths() {
  const months = [];
  const now = new Date();
  for (let i = 9; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('default', { month: 'short' });
    months.push(label);
  }
  return months;
}

export default function VaccinationChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/vacunaciones/vacunaciones', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const counts = {};
      res.data.forEach((vac) => {
        const date = new Date(vac.fecha);
        const label = date.toLocaleString('default', { month: 'short' });
        counts[label] = (counts[label] || 0) + 1;
      });

      const labels = getLastTenMonths();
      const data = labels.map((label) => counts[label] || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Vacunaciones por mes',
            backgroundColor: '#5D9C00',
            data,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Vacunaciones por mes
      </Typography>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </>
  );
}
