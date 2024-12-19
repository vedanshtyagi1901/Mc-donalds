import React from 'react';
import html2canvas from 'html2canvas';

function Bill({ bill, handleViewBill, showBillModal, handleCloseModal }) {
  const handlePrint = () => {
    // Get the modal content and the buttons
    const billModal = document.getElementById("billModal");
    const closeButton = document.getElementById("closeButton");
    const printButton = document.getElementById("printButton");

    // Temporarily hide the close and print buttons
    closeButton.style.display = 'none';
    printButton.style.display = 'none';

    // Use html2canvas to capture the modal content as an image
    html2canvas(billModal, { logging: true, useCORS: true }).then((canvas) => {
      // Ensure the canvas has content
      if (!canvas || !canvas.toDataURL) {
        console.error('Canvas creation failed.');
        return;
      }

      // Create an image from the canvas
      const imgData = canvas.toDataURL("image/png");

      // Create a temporary window for printing
      const printWindow = window.open('', '', 'height=600,width=800');
      printWindow.document.write('<html><body><img src="' + imgData + '" style="width: 100%; height: auto;"/></body></html>');
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
            <h2 className="text-xl font-semibold mb-4 text-center">Your Bill</h2>
            <ul className="space-y-2">
              {bill.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{item.title} (x{item.quantity})</span>
                  <span>₹{item.total}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-semibold text-right">
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
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Print Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bill;
