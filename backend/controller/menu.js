import MenuItem  from '../models/menuItems.js';
import ErrorHandler from '../middlewares/error.js';

// Controller function to fetch all menu items
const getMenuItems = async (req, res, next) => {
  try {
    // Fetch all menu items from the MenuItem collection
    const menuItems = await MenuItem.find();
    
    // Check if menu items exist
    if (!menuItems || menuItems.length === 0) {
      return next(new ErrorHandler("No menu items found.", 404));
    }

    // Send a successful response with the menu items
    res.status(200).json({
      success: true,
      menuItems,
    });
  } catch (error) {
    // Handle any errors (e.g., database issues)
    return next(error);
  }
};

export { getMenuItems };
