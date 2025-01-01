import React from 'react'
import Unique_Customers_donought_chart from './Unique_Customers_donought_chart'
import Total_Customers from './Total_Customers';
import Customer_Frequency from './Customer_Frequency';
import Total_Customers_Frequency from './Total_Customers_Frequency';

function Customer_footsteps() {
    return (
        <div>
            <div className='block ml-14'>
                <div className='flex gap-10'>
                    <div className='ml-4 m-2'>
                        <Unique_Customers_donought_chart />
                    </div>
                    <div className='m-2'>
                        <Total_Customers />
                    </div>
                </div>
            </div>
            <div className='flex gap-40 ml-5'>
                <Customer_Frequency />
                <Total_Customers_Frequency/>
            </div>
        </div>
    )
}

export default Customer_footsteps;