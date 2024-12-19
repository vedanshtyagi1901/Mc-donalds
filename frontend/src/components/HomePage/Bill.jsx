import React from 'react'

function Bill({bill, handleViewBill, showBillModal, handleCloseModal}) {
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform scale-95 transition-all duration-500 ease-in-out opacity-100 animate-modal-in">
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
                        <div className="mt-4 text-right">
                            <button
                                onClick={handleCloseModal}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Bill