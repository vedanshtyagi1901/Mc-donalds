import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
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

const CategoryWiseSalesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('CategoryWise');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/reservation/get-bills');
        const result = await response.json();

        if (result.success) {
          setData(result.bills);
        } else {
          throw new Error('Failed to fetch bills data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = {
    CategoryWise: {
      labels: ['Burgers', 'Desserts', 'Pizzas', 'Cold Drinks', 'Special Combos'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_burger1 + bill.Quantity_burger2 + bill.Quantity_burger3 + bill.Quantity_burger4, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_dessert1 + bill.Quantity_dessert2 + bill.Quantity_dessert3 + bill.Quantity_dessert4, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_pizza1 + bill.Quantity_pizza2 + bill.Quantity_pizza3 + bill.Quantity_pizza4, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_cold_drink1 + bill.Quantity_cold_drink2 + bill.Quantity_cold_drink3 + bill.Quantity_cold_drink4, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_special_combos1 + bill.Quantity_special_combos2 + bill.Quantity_special_combos3 + bill.Quantity_special_combos4, 0),
      ],
    },
    Burgers: {
      labels: ['Burger 1', 'Burger 2', 'Burger 3', 'Burger 4'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_burger1, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_burger2, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_burger3, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_burger4, 0),
      ],
    },
    Pizzas: {
      labels: ['Pizza 1', 'Pizza 2', 'Pizza 3', 'Pizza 4'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_pizza1, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_pizza2, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_pizza3, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_pizza4, 0),
      ],
    },
    'Cold Drinks': {
      labels: ['Cold Drink 1', 'Cold Drink 2', 'Cold Drink 3', 'Cold Drink 4'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_cold_drink1, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_cold_drink2, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_cold_drink3, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_cold_drink4, 0),
      ],
    },
    'Special Combos': {
      labels: ['Special Combo 1', 'Special Combo 2', 'Special Combo 3', 'Special Combo 4'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_special_combos1, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_special_combos2, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_special_combos3, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_special_combos4, 0),
      ],
    },
    Desserts: {
      labels: ['Dessert 1', 'Dessert 2', 'Dessert 3', 'Dessert 4'],
      data: [
        data.reduce((acc, bill) => acc + bill.Quantity_dessert1, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_dessert2, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_dessert3, 0),
        data.reduce((acc, bill) => acc + bill.Quantity_dessert4, 0),
      ],
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: categories[currentCategory].labels,
    datasets: [
      {
        label: `${currentCategory} Sales`,
        data: categories[currentCategory].data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-white text-center text-2xl font-bold mb-4">Item Sales Chart</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="w-full h-[500px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
            }}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full"
            onClick={() => setCurrentCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseSalesChart;
