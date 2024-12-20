import { Reservation } from "../models/reservation.js";
import { Bill } from "../models/bill.js";  // Import the Bill model
import ErrorHandler from "../middlewares/error.js";

const send_reservation = async (req, res, next) => {
  // Destructure values from req.body
  const {
    Name,
    email,
    date,
    time,
    phone,
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
    specialCombos1,
    specialCombos2,
    specialCombos3,
    specialCombos4
  } = req.body;

  // Check for missing fields (reservation and items)
  if (!Name || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill in the full reservation form!", 400));
  }

  // Check if at least one food item is selected
  if (
    !burger1 && !burger2 && !burger3 && !burger4 &&
    !dessert1 && !dessert2 && !dessert3 && !dessert4 &&
    !pizza1 && !pizza2 && !pizza3 && !pizza4 &&
    !coldDrink1 && !coldDrink2 && !coldDrink3 && !coldDrink4 &&
    !specialCombos1 && !specialCombos2 && !specialCombos3 && !specialCombos4
  ) {
    return next(new ErrorHandler("Please select at least one food item!", 400));
  }

  try {
    // Create the reservation
    const reservation = await Reservation.create({ Name, email, date, time, phone });

    // Create the bill with the same _id as the reservation
    const newBill = new Bill({
      _id: reservation._id,  // Set the same _id as the reservation
      totalAmount: 0,  // Total amount will be calculated based on the items
      // Set item quantities dynamically from the user input
      Quantity_burger1: burger1 || 0,
      Quantity_burger2: burger2 || 0,
      Quantity_burger3: burger3 || 0,
      Quantity_burger4: burger4 || 0,
      Quantity_dessert1: dessert1 || 0,
      Quantity_dessert2: dessert2 || 0,
      Quantity_dessert3: dessert3 || 0,
      Quantity_dessert4: dessert4 || 0,
      Quantity_pizza1: pizza1 || 0,
      Quantity_pizza2: pizza2 || 0,
      Quantity_pizza3: pizza3 || 0,
      Quantity_pizza4: pizza4 || 0,
      Quantity_cold_drink1: coldDrink1 || 0,
      Quantity_cold_drink2: coldDrink2 || 0,
      Quantity_cold_drink3: coldDrink3 || 0,
      Quantity_cold_drink4: coldDrink4 || 0,
      Quantity_special_combos1: specialCombos1 || 0,
      Quantity_special_combos2: specialCombos2 || 0,
      Quantity_special_combos3: specialCombos3 || 0,
      Quantity_special_combos4: specialCombos4 || 0,
    });

    // // Calculate totalAmount (assuming each item has a fixed price)
    // const prices = {
    //   burger1: 100, burger2: 120, burger3: 150, burger4: 180,
    //   dessert1: 50, dessert2: 60, dessert3: 70, dessert4: 80,
    //   pizza1: 200, pizza2: 220, pizza3: 250, pizza4: 270,
    //   coldDrink1: 30, coldDrink2: 35, coldDrink3: 40, coldDrink4: 45,
    //   specialCombos1: 250, specialCombos2: 270, specialCombos3: 300, specialCombos4: 330
    // };

    // let totalAmount = 0;
    // for (let key in newBill) {
    //   if (key.startsWith('Quantity_') && newBill[key] > 0) {
    //     const itemName = key.replace('Quantity_', '');
    //     totalAmount += newBill[key] * prices[itemName];
    //   }
    // }

    // newBill.totalAmount = totalAmount;

    // Save the bill
    await newBill.save();

    // Send the response
    res.status(201).json({
      success: true,
      message: "Reservation and Bill Created Successfully!",
      reservation,
      bill: newBill,
    });

  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
};

export default send_reservation;
