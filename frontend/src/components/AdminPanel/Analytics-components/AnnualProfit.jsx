import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2'; // Import Line chart for time series
import { Chart as ChartJS } from 'chart.js'; // Import ChartJS to register components
import { ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'; // Register necessary chart elements
import { format, isToday, isThisMonth, isThisYear, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'; // Import date-fns for date comparison

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement); // Added PointElement here

function AnnualProfit() {
    const [reservations, setReservations] = useState([]);
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('daily'); // State to manage time range (daily, weekly, monthly, yearly)

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

    const groupDataByTimeRange = (reservations, bills, timeRange) => {
        const earningsByDate = {};
    
        // Helper function to format dates based on the time range
        const getFormattedDate = (date) => {
            switch (timeRange) {
                case 'weekly':
                    const startOfWeekDate = startOfWeek(date);
                    return format(startOfWeekDate, 'yyyy-MM-dd');
                case 'monthly':
                    const startOfMonthDate = startOfMonth(date);
                    return format(startOfMonthDate, 'yyyy-MM-dd');
                case 'yearly':
                    const startOfYearDate = startOfYear(date);
                    return format(startOfYearDate, 'yyyy-MM-dd');
                default:
                    return format(date, 'yyyy-MM-dd'); // Daily
            }
        };
    
        // Aggregate earnings based on the selected time range
        reservations.forEach((reservation) => {
            const matchingBill = bills.find((bill) => bill._id === reservation._id);
            if (matchingBill) {
                const billDate = new Date(reservation.date);
                const formattedDate = getFormattedDate(billDate);
    
                if (!earningsByDate[formattedDate]) {
                    earningsByDate[formattedDate] = 0;
                }
                earningsByDate[formattedDate] += matchingBill.totalAmount;
            }
        });
    
        // Sort the keys (dates) and create a reduced list of labels
        const sortedDates = Object.keys(earningsByDate).sort();
        const labels = [];
        const data = [];
    
        sortedDates.forEach((date, index) => {
            if (timeRange === 'weekly' && index > 0) {
                // Ensure only one date per week is added
                const prevDate = new Date(sortedDates[index - 1]);
                const currDate = new Date(date);
                if (getFormattedDate(currDate) !== getFormattedDate(prevDate)) {
                    labels.push(date);
                    data.push(earningsByDate[date]);
                }
            } else {
                // For other ranges or the first date in weekly, add it directly
                labels.push(date);
                data.push(earningsByDate[date]);
            }
        });
    
        return { labels, data };
    };
    
    

    // Prepare the time series data based on the selected time range
    const timeSeriesData = groupDataByTimeRange(reservations, bills, timeRange);

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
        <div className="time_series_container p-4 text-white justify-center w-[1200px] mx-auto">
            {/* Doughnut Charts for Today, Monthly, Yearly, All-Time Earnings */}
            <div className="donut-container ml-20">
                <div className="flex flex-row gap-36">
                    {/* Today's Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">Today's Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).today)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).today.toLocaleString()}`}</p>
                    </div>
                    {/* Monthly Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">This month Earnings</h2>
                        <Doughnut data={doughnutData(calculateEarnings(reservations, bills).thisMonth)} options={{ responsive: true }} />
                        <p className="text-center mt-2">{`₹${calculateEarnings(reservations, bills).thisMonth.toLocaleString()}`}</p>
                    </div>
                    {/* Annual Earnings */}
                    <div className="chart-container" style={{ width: '160px', height: '160px' }}>
                        <h2 className="text-center">This year Earnings</h2>
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
            <div className="chart-section flex justify-start items-start gap-6 mt-16 mx-40">

                {/* Time Series Line Chart */}
                <div className="chart-container bg-gray-800" style={{ minWidth: '800px', width: '100%' }}>
                    <h2 className="text-center text-white">Earnings Over Time</h2>
                    {/* Container with Horizontal Scroll */}
                    <div className="overflow-x-auto">
                        <Line data={lineChartData} options={{
                            responsive: true,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Date',
                                    },
                                    ticks: {
                                        autoSkip: true,  // Automatically skips labels if there are too many
                                        maxRotation: 45, // Rotate labels to make them more readable
                                        minRotation: 30, // Rotate labels at minimum 30 degrees
                                    }
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

                {/* Buttons for time range selection */}
                <div className="flex flex-col justify-center gap-12 mt-20">
                    <button onClick={() => setTimeRange('daily')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">Daily</button>
                    <button onClick={() => setTimeRange('weekly')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">Weekly</button>
                    <button onClick={() => setTimeRange('monthly')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">Monthly</button>
                    <button onClick={() => setTimeRange('yearly')} className="btn bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700">Yearly</button>
                </div>

            </div>
        </div>
    );
}

export default AnnualProfit;
