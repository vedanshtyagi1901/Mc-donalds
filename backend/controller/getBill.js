import { Bill } from '../models/bill.js'; // Import Bill model
import ErrorHandler from '../middlewares/error.js'; // Import ErrorHandler for consistent error handling

// Controller function to fetch all bills
const getAllBills = async (req, res, next) => {
  try {
    // Fetch all bills from the Bill collection
    const bills = await Bill.find();

    // Check if any bills exist
    if (!bills || bills.length === 0) {
      return next(new ErrorHandler('No bills found.', 404));
    }

    // Send a successful response with all bills
    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    // Handle any errors (e.g., database issues)
    return next(error);
  }
};

export { getAllBills };
