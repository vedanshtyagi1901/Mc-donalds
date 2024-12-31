import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2'; // Import Line chart for time series
import { Chart as ChartJS } from 'chart.js'; // Import ChartJS to register components
import { ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'; // Register necessary chart elements
import { format, isToday, isThisMonth, isThisYear, parseISO } from 'date-fns'; // Import date-fns for date comparison

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement); // Added PointElement here

function AnnualProfit() {
    const [reservations, setReservations] = useState([]);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch reservations
                const reservationResponse = await fetch('http://localhost:4000/api/v1/reservation/get-reservations');
                const reservationResult = await reservationResponse.json();
                if (reservationResult.success) {
                    setReservations(reservationResult.reservations);
                } else {
                    throw new Error('Failed to fetch reservations');
                }

                // Fetch bills
                const billResponse = await fetch('http://localhost:4000/api/v1/reservation/get-bills');
                const billResult = await billResponse.json();
                if (billResult.success) {
                    setBills(billResult.bills);
                } else {
                    throw new Error('Failed to fetch bills');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to calculate earnings based on reservations and bills for different time periods
    const calculateEarnings = (reservations, bills) => {
        let today = 0;
        let thisMonth = 0;
        let thisYear = 0;
        let allTime = 0;

        // Match each reservation with the corresponding bill
        reservations.forEach((reservation) => {
            const matchingBill = bills.find((bill) => bill._id === reservation._id);
            if (matchingBill) {
                const billDate = new Date(reservation.date); // Extract the date from the reservation

                // Check if the bill was today
                if (isToday(billDate)) {
                    today += matchingBill.totalAmount;
                }

                // Check if the bill was in the current month
                if (isThisMonth(billDate)) {
                    thisMonth += matchingBill.totalAmount;
                }

                // Check if the bill was in the current year
                if (isThisYear(billDate)) {
                    thisYear += matchingBill.totalAmount;
                }

                // All-time earnings (total amount for all bills)
                allTime += matchingBill.totalAmount;
            }
        });

        return { today, thisMonth, thisYear, allTime };
    };

    // Function to prepare time-series data for the chart
    const prepareTimeSeriesData = (reservations, bills) => {
        // Create an object to store earnings by date
        const earningsByDate = {};

        // Get the earliest and latest dates in the dataset
        const allDates = reservations.map((reservation) => new Date(reservation.date));
        const minDate = new Date(Math.min(...allDates));
        const maxDate = new Date(Math.max(...allDates));

        // Loop through all dates in the range and fill in the earningsByDate object
        let currentDate = minDate;

        while (currentDate <= maxDate) {
            const formattedDate = format(currentDate, 'yyyy-MM-dd'); // Format date as string
            earningsByDate[formattedDate] = 0; // Default value 0 for missing dates

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Match each reservation with the corresponding bill
        reservations.forEach((reservation) => {
            const matchingBill = bills.find((bill) => bill._id === reservation._id);
            if (matchingBill) {
                const billDate = new Date(reservation.date);
                const formattedDate = format(billDate, 'yyyy-MM-dd'); // Format date as string

                earningsByDate[formattedDate] += matchingBill.totalAmount; // Add earnings for that date
            }
        });

        // Convert earningsByDate to arrays for chart.js
        const labels = Object.keys(earningsByDate); // Dates
        const data = Object.values(earningsByDate); // Corresponding earnings

        return { labels, data };
    };

    // Prepare the time series data
    const timeSeriesData = prepareTimeSeriesData(reservations, bills);

    // Chart.js Line Chart Data for Time Series
    const lineChartData = {
        labels: timeSeriesData.labels,
        datasets: [{
            label: 'Total Earnings',
            data: timeSeriesData.data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1,
            fill: true,
        }]
    };

    // Function to generate Doughnut chart data
    const doughnutData = (value) => ({
        labels: ['Earnings'],
        datasets: [{
            data: [value, 0], // Data for the doughnut chart (part and remaining)
            backgroundColor: ['rgba(54, 162, 235, 0.2)', '#eeeeee'], // Using the excellent blue color
            borderColor: ['rgba(54, 162, 235, 1)', '#eeeeee'], // Border with the same color
            borderWidth: 1,
        }]
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="time_series_container mx-14 p-4 text-white justify-center">
            {/* Doughnut Charts for Today, Monthly, Yearly, All-Time Earnings */}
            <div className="donut-container">

                <div className="flex flex-row gap-36">
                    {/* Today's Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">Today's Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).today)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).today.toLocaleString()}`}</p>
                    </div>

                    {/* Monthly Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">Monthly Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).thisMonth)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).thisMonth.toLocaleString()}`}</p>
                    </div>

                    {/* Annual Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">Annual Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).thisYear)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).thisYear.toLocaleString()}`}</p>
                    </div>

                    {/* All-Time Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">All-Time Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).allTime)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).allTime.toLocaleString()}`}</p>
                    </div>
                </div>
            </div>

            <div className="chart-section">

                {/* Time Series Line Chart */}
                <div className="chart-container w-[800px] mx-28 mt-16 bg-gray-800">
                    <h2 className="text-center">Earnings Over Time</h2>
                    <Line data={lineChartData} options={{
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Earnings (₹)',
                                },
                            },
                        },
                    }} />
                </div>
            </div>
        </div>
    );
}

export default AnnualProfit;
