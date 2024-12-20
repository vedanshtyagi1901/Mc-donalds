import React, { useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';

function Bill({
  bill,
  handleViewBill,
  showBillModal,
  handleCloseModal,
  burger1,
  burger2,
  burger3,
  burger4,
  dessert1,
  dessert2,
  dessert3,
  dessert4,
  pizza1,
  pizza2,
  pizza3,
  pizza4,
  coldDrink1,
  coldDrink2,
  coldDrink3,
  coldDrink4,
  specialCombo1,
  specialCombo2,
  specialCombo3,
  specialCombo4,
}) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    if (!name || !mobileNumber || !email) {
      alert('Please enter name, mobile number, and email.');
      return;
    }
    setIsFormSubmitted(true); // Show the bill details after form submission
  };

  const getIndianTime = () => {
    const utcDate = new Date();
    const indiaOffset = 5.5 * 60; // IST is UTC+5:30
    const indiaDate = new Date(utcDate.getTime() + indiaOffset * 60000); // Convert to IST

    const date = indiaDate.toISOString().split('T')[0]; // Date in YYYY-MM-DD format
    const time = indiaDate.toISOString().split('T')[1].split('.')[0]; // Time in HH:MM:SS format
    return { date, time };
  };

  const handlePrint = async () => {
    // Get the modal content and the buttons
    const billModal = document.getElementById('billModal');
    const closeButton = document.getElementById('closeButton');
    const printButton = document.getElementById('printButton');

    // Temporarily hide the close and print buttons
    closeButton.style.display = 'none';
    printButton.style.display = 'none';

    // Get the current IST date and time
    const { date, time } = getIndianTime();

    // Prepare the data to send to the server
    const reservationData = {
      Name: name,
      email: email,
      date: date, // Current date in IST
      time: time, // Current time in IST
      phone: mobileNumber,
      // Burger items
      burger1: burger1 || 0,
      burger2: burger2 || 0,
      burger3: burger3 || 0,
      burger4: burger4 || 0,
      // Dessert items
      dessert1: dessert1 || 0,
      dessert2: dessert2 || 0,
      dessert3: dessert3 || 0,
      dessert4: dessert4 || 0,
      // Pizza items
      pizza1: pizza1 || 0,
      pizza2: pizza2 || 0,
      pizza3: pizza3 || 0,
      pizza4: pizza4 || 0,
      // Cold drink items
      coldDrink1: coldDrink1 || 0,
      coldDrink2: coldDrink2 || 0,
      coldDrink3: coldDrink3 || 0,
      coldDrink4: coldDrink4 || 0,
      // Special Combo items
      specialCombos1: specialCombo1 || 0,
      specialCombos2: specialCombo2 || 0,
      specialCombos3: specialCombo3 || 0,
      specialCombos4: specialCombo4 || 0,
    };

    try {
      // Send the reservation and bill details to the API
      const response = await axios.post('http://localhost:4000/api/v1/reservation/send', reservationData);

      if (response.data.success) {
        alert('Reservation and Bill Created Successfully!');
      } else {
        alert('There was an issue creating the reservation and bill.');
      }

      // Use html2canvas to capture the modal content as an image
      html2canvas(billModal, { logging: true, useCORS: true }).then((canvas) => {
        if (!canvas || !canvas.toDataURL) {
          console.error('Canvas creation failed.');
          return;
        }

        // Create an image from the canvas
        const imgData = canvas.toDataURL('image/png');

        // Create a temporary window for printing
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(
          '<html><body><img src="' +
            imgData +
            '" style="width: 100%; height: auto;"/></body></html>'
        );
        printWindow.document.close();

        // Wait a short delay to ensure image rendering before printing
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
            printWindow.close(); // Close the print window after printing
          }, 500);
        };

        // Restore the visibility of the buttons
        closeButton.style.display = 'block';
        printButton.style.display = 'block';
      }).catch((error) => {
        console.error('Error capturing the modal content:', error);
        // Restore the visibility of the buttons in case of an error
        closeButton.style.display = 'block';
        printButton.style.display = 'block';
      });

    } catch (err) {
      console.error('Error sending data to the server:', err);
      alert('An error occurred while processing the reservation and bill.');
      // Restore the visibility of the buttons in case of an error
      closeButton.style.display = 'block';
      printButton.style.display = 'block';
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-24">
        <button
          onClick={handleViewBill}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
        >
          View Bill
        </button>
      </div>

      {/* Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 opacity-100">
          <div
            id="billModal" // Add id for html2canvas targeting
            className="bg-white p-6 rounded-lg shadow-lg w-96 transform scale-95 transition-all duration-500 ease-in-out opacity-100 animate-modal-in"
          >
            {/* First ask for the mobile number, seat number, and email */}
            {!isFormSubmitted ? (
              <div className="bg-yellow-400 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center text-red-600">Enter Your Details</h2>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold text-red-600">Name:</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mobileNumber" className="block text-sm font-semibold text-red-600">Mobile Number:</label>
                  <input
                    id="mobileNumber"
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold text-red-600">Email:</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
                <button
                  onClick={handleFormSubmit}
                  className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Submit
                </button>
              </div>
            ) : (
              // Once form is submitted, show the bill details
              <div className="bg-yellow-400 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-center text-red-600">Your Bill</h2>
                <ul className="space-y-2">
                  {bill.items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>₹{item.total}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 font-semibold text-right text-red-600">
                  Total Amount: ₹{bill.totalAmount}
                </div>
                <div className="mt-4 text-right flex justify-between">
                  <button
                    id="closeButton" // Add an id for hiding the button during print
                    onClick={handleCloseModal}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Close
                  </button>
                  <button
                    id="printButton" // Add an id for hiding the button during print
                    onClick={handlePrint} // Trigger print
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Print Bill
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
