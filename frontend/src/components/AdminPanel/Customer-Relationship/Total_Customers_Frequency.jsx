import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Total_Customers_Frequency() {
  const [visitData, setVisitData] = useState([]); // Initialize as an empty array
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  // Helper function to calculate total visits based on the frequency
  const processVisitData = (reservations, period) => {
    const visits = {};

    reservations.forEach((reservation) => {
      const { phone, date } = reservation;
      const reservationDate = new Date(date);

      // Calculate time difference based on selected period
      let periodKey = '';
      switch (period) {
        case 'daily':
          periodKey = reservationDate.toDateString(); // Unique by day
          break;
        case 'weekly':
          periodKey = `${reservationDate.getFullYear()}-W${Math.floor(reservationDate.getDate() / 7)}`; // Week of the year
          break;
        case 'fortnightly':
          periodKey = `${reservationDate.getFullYear()}-FW${Math.floor(reservationDate.getDate() / 14)}`; // Fortnight
          break;
        case 'monthly':
          periodKey = `${reservationDate.getFullYear()}-${reservationDate.getMonth() + 1}`; // Month and Year
          break;
        case 'quarterly':
          periodKey = `${reservationDate.getFullYear()}-Q${Math.floor(reservationDate.getMonth() / 3) + 1}`; // Quarter
          break;
        case 'semi-yearly':
          periodKey = `${reservationDate.getFullYear()}-H${Math.floor(reservationDate.getMonth() / 6) + 1}`; // Half-year
          break;
        case 'yearly':
          periodKey = `${reservationDate.getFullYear()}`; // Year only
          break;
        default:
          periodKey = reservationDate.toDateString();
      }

      // Count the total visits for each period (we count every visit, not unique visits)
      if (!visits[periodKey]) {
        visits[periodKey] = 0;
      }
      visits[periodKey] += 1; // Increment total visits for this period
    });

    // Calculate visit counts for each period and return it as an array
    return Object.keys(visits).map((key) => ({
      period: key,
      count: visits[key], // Total visit count
    }));
  };

  // Fetch the reservations data from the API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/reservation/get-reservations');
        const reservations = response.data.reservations;

        const visitCounts = processVisitData(reservations, selectedPeriod);
        setVisitData(visitCounts);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchReservations();
  }, [selectedPeriod]);

  // Chart data
  const chartData = {
    labels: visitData.map((data) => data.period), // Labels for the X-axis
    datasets: [
      {
        label: 'Total Customers',
        data: visitData.map((data) => data.count), // Y-axis data for total customer count (visits)
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#333',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: '#333',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="p-2 bg-gray-800 text-white rounded-lg shadow-md mt-4 h-10 w-[500px]">
      <h2 className="text-xl font-bold mb-4 text-center">Total Customer Frequency</h2>

      {/* Filter Section */}
      <div className="mb-2">
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="fortnightly">Fortnightly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semi-yearly">Semi-Yearly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="relative h-52">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Total_Customers_Frequency;
