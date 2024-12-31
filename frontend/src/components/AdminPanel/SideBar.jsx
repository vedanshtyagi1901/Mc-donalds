import React, { useState } from 'react';
import Menu from './Menu-components/Menu';
import CategoryWiseSalesChart from './Analytics-components/CategoryWiseSalesChart';
import AnnualProfit from './Analytics-components/AnnualProfit';

function SideBar() {
    const [content, setContent] = useState('');
    const [analyticsOpen, setAnalyticsOpen] = useState(false); // State to manage analytics dropdown

    return (
        <>
            <div className='flex bg-[rgb(16,20,34)]'>
                <div className="h-screen w-64 bg-gray-800 text-white p-4">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center mb-8">
                        <span className="text-2xl font-bold text-indigo-500">Admin Panel</span>
                    </div>

                    {/* Navigation Section */}
                    <nav>
                        <ul>
                            {/* Dashboard Link */}
                            <li onClick={() => setContent('Menu')}>
                                <a href="#" className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l2 2m-2-2v6m5-6l2-2m0 0l2 2m-2-2v6m5-6l2-2m0 0l2 2m-2-2v6m5-6l2-2m0 0l2 2m-2-2v6" />
                                    </svg>
                                    <span className="text-lg">Menu</span>
                                </a>
                            </li>

                            {/* Analytics Link with Dropdown */}
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                                    onClick={() => setAnalyticsOpen(!analyticsOpen)} // Toggle dropdown
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m4-4h-4m-4 8h4m6 0h-2a2 2 0 01-2-2V7a2 2 0 012-2h2M5 3v18a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                                    </svg>
                                    <span className="text-lg">Analytics</span>
                                </a>

                                {/* Dropdown Menu for Analytics */}
                                {analyticsOpen && (
                                    <ul className="pl-8 mt-2 space-y-2">
                                        <li onClick={() => setContent('Sales-Chart')}>
                                            <a href="#" className="flex items-center space-x-4 py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                                <span className="text-lg">Sales Chart</span>
                                            </a>
                                        </li>
                                        <li onClick={() => setContent('Annual-Profit')}>
                                            <a href="#" className="flex items-center space-x-4 py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                                <span className="text-lg">Annual Profit</span>
                                            </a>
                                        </li>
                                    </ul>
                                )}
                            </li>

                            {/* User Management Link */}
                            <li>
                                <a href="#" className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 0m-7 18l0-12m0 12l-7-6m7 6l7-6" />
                                    </svg>
                                    <span className="text-lg">User Management</span>
                                </a>
                            </li>

                            {/* Settings Link */}
                            <li>
                                <a href="#" className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 0m-7 18l0-12m0 12l-7-6m7 6l7-6" />
                                    </svg>
                                    <span className="text-lg">Settings</span>
                                </a>
                            </li>

                            {/* Profile Link */}
                            <li>
                                <a href="#" className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4h14V3zM5 7v4h14V7zM5 11v4h14v-4zM5 15v4h14v-4zM5 19v4h14v-4z" />
                                    </svg>
                                    <span className="text-lg">Profile</span>
                                </a>
                            </li>

                            {/* Logout Link */}
                            <li>
                                <a href="#" className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-indigo-600 transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18M3 21L21 3" />
                                    </svg>
                                    <span className="text-lg">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Bottom Section (Optional for profile or settings) */}
                    <div className="mt-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">A</span>
                            </div>
                            <span className="text-sm text-gray-300">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Display the selected chart content */}
                {content === 'Menu' && <Menu />}
                {content === 'Sales-Chart' && <CategoryWiseSalesChart />}
                {content === 'Annual-Profit' && <AnnualProfit/>}
            </div>
        </>
    );
}

export default SideBar;
