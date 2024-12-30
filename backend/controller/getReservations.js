import {Reservation} from '../models/reservation.js'; // Import Reservation model
import ErrorHandler from '../middlewares/error.js'; // Import ErrorHandler for consistent error handling

// Controller function to fetch all reservations
const getAllReservations = async (req, res, next) => {
  try {
    // Fetch all reservations from the Reservation collection
    const reservations = await Reservation.find();

    // Check if any reservations exist
    if (!reservations || reservations.length === 0) {
      return next(new ErrorHandler('No reservations found.', 404));
    }

    // Send a successful response with all reservations
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    // Handle any errors (e.g., database issues)
    return next(error);
  }
};

export { getAllReservations };
