import React, { useEffect, useState } from 'react';
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
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/reservation/get-bills');
                const result = await response.json();

                if (result.success) {
                    const { bills } = result;

                    // Initialize an object to aggregate quantities
                    const quantities = {
                        burgers: 0,
                        desserts: 0,
                        pizzas: 0,
                        coldDrinks: 0,
                        specialCombos: 0,
                    };

                    // Aggregate item quantities from all bills
                    bills.forEach((bill) => {
                        quantities.burgers +=
                            bill.Quantity_burger1 +
                            bill.Quantity_burger2 +
                            bill.Quantity_burger3 +
                            bill.Quantity_burger4;
                        quantities.desserts +=
                            bill.Quantity_dessert1 +
                            bill.Quantity_dessert2 +
                            bill.Quantity_dessert3 +
                            bill.Quantity_dessert4;
                        quantities.pizzas +=
                            bill.Quantity_pizza1 +
                            bill.Quantity_pizza2 +
                            bill.Quantity_pizza3 +
                            bill.Quantity_pizza4;
                        quantities.coldDrinks +=
                            bill.Quantity_cold_drink1 +
                            bill.Quantity_cold_drink2 +
                            bill.Quantity_cold_drink3 +
                            bill.Quantity_cold_drink4;
                        quantities.specialCombos +=
                            bill.Quantity_special_combos1 +
                            bill.Quantity_special_combos2 +
                            bill.Quantity_special_combos3 +
                            bill.Quantity_special_combos4;
                    });

                    // Set the data for the chart
                    setChartData({
                        labels: ['Burgers', 'Desserts', 'Pizzas', 'Cold Drinks', 'Special Combos'],
                        datasets: [
                            {
                                label: 'Number of Items Sold',
                                data: [
                                    quantities.burgers,
                                    quantities.desserts,
                                    quantities.pizzas,
                                    quantities.coldDrinks,
                                    quantities.specialCombos,
                                ],
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
                    });
                } else {
                    throw new Error('Failed to fetch bills');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-white text-center text-2xl font-bold mb-4">Item Sales Chart</h2>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="w-full h-[500px]">
                    <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>
            </div>
        </div>

    );
};

export default CategoryWiseSalesChart;
