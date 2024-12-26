import MenuItem from '../models/menuItems.js';
import ErrorHandler from '../middlewares/error.js';

// Controller function to fetch a specific menu item by ID
const getMenuItemById = async (req, res, next) => {
  try {
    // Extract menu item ID from request parameters
    const { id } = req.params;

    // Fetch the menu item by ID from the MenuItem collection
    const menuItem = await MenuItem.findById(id);

    // Check if the menu item exists
    if (!menuItem) {
      return next(new ErrorHandler(`Menu item with ID ${id} not found.`, 404));
    }

    // Send a successful response with the menu item
    res.status(200).json({
      success: true,
      menuItem,
    });
  } catch (error) {
    // Handle any errors (e.g., database issues, invalid ID format)
    return next(error);
  }
};

export { getMenuItemById };
