import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

function Total_Customers() {
  const [totalCustomerCount, setTotalCustomerCount] = useState(0);
  const [filter, setFilter] = useState('today'); // Default filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchReservations = async (filterParams) => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/reservation/get-reservations');
      const reservations = response.data.reservations;

      // Filter reservations based on the selected time frame
      const filteredReservations = reservations.filter((reservation) => {
        const reservationDate = new Date(reservation.date); // Assuming `date` is the reservation field
        const now = new Date();

        switch (filterParams) {
          case 'today':
            return reservationDate.toDateString() === now.toDateString();
          case 'last-3-days':
            return reservationDate >= new Date(now.setDate(now.getDate() - 3));
          case 'last-week':
            return reservationDate >= new Date(now.setDate(now.getDate() - 7));
          case 'last-month':
            return reservationDate >= new Date(now.setMonth(now.getMonth() - 1));
          case 'last-year':
            return reservationDate >= new Date(now.setFullYear(now.getFullYear() - 1));
          case 'custom':
            if (startDate && endDate) {
              const start = new Date(startDate);
              const end = new Date(endDate);
              return reservationDate >= start && reservationDate <= end;
            }
            return false;
          default:
            return true;
        }
      });

      // Extract total customers using phone numbers
      const totalCustomers = new Set(filteredReservations.map((reservation) => reservation._id)); // Assuming _id identifies customers
      setTotalCustomerCount(totalCustomers.size);
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  useEffect(() => {
    fetchReservations(filter);
  }, [filter, startDate, endDate]);

  // Doughnut chart data
  const data = {
    labels: ['Total Customers', ''],
    datasets: [
      {
        label: 'Total Customers',
        data: [0,totalCustomerCount], // Replace 100 with the actual total if needed
        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.9)', 'rgba(255, 99, 132, 0.9)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Options for dark theme
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // Legend text color
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-2 bg-gray-800 text-white rounded-lg shadow-md w-[500px]">
      <h2 className="text-xl font-bold mb-2 text-center">Total Customers</h2>

      {/* Filter Section */}
      <div className="mb-2 flex flex-col gap-2">
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="last-3-days">Last 3 Days</option>
          <option value="last-week">Last Week</option>
          <option value="last-month">Last Month</option>
          <option value="last-year">Last Year</option>
          <option value="custom">Custom Date Range</option>
        </select>

        {filter === 'custom' && (
          <div className="flex gap-2">
            <input
              type="date"
              className="p-2 rounded bg-gray-700 text-white w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="p-2 rounded bg-gray-700 text-white w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Doughnut Chart */}
      <div className="relative w-full h-40">
        <Doughnut data={data} options={options} />
      </div>

      <p className="mt-2 text-center text-gray-300">
        Total Customers: <span className="font-bold text-white">{totalCustomerCount}</span>
      </p>
    </div>
  );
}

export default Total_Customers;
