import MenuItem from '../models/menuItems.js';
import ErrorHandler from '../middlewares/error.js';

// Controller function to update a menu item (only if it exists)
const createMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract id from URL parameters
    const { title, image, price } = req.body; // Extract data from the request body

    // Validate required fields
    if (!title || !image || !price) {
      return next(new ErrorHandler('All fields (title, image, price) are required.', 400));
    }

    // Attempt to find the existing menu item by id
    const existingMenuItem = await MenuItem.findById(id);

    if (!existingMenuItem) {
      // If the item doesn't exist, return an error without creating a new one
      return next(new ErrorHandler(`Menu item with ID ${id} does not exist.`, 404));
    }

    // If the item exists, update it
    existingMenuItem.title = title;
    existingMenuItem.image = image;
    existingMenuItem.price = price;

    // Save the updated menu item to the database
    await existingMenuItem.save();

    return res.status(200).json({
      success: true,
      message: `Menu item with ID ${id} updated successfully.`,
      menuItem: existingMenuItem,
    });

  } catch (error) {
    // Handle any errors
    return next(error);
  }
};

export { createMenuItem };
