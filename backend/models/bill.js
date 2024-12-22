import mongoose from "mongoose";

// Define the bill schema with quantities for each type of food
const billSchema = new mongoose.Schema({
  // Burger quantities (4 types)
  Quantity_burger1: {
    type: Number,
    default: 0,
  },
  Quantity_burger2: {
    type: Number,
    default: 0,
  },
  Quantity_burger3: {
    type: Number,
    default: 0,
  },
  Quantity_burger4: {
    type: Number,
    default: 0,
  },
  
  // Dessert quantities (4 types)
  Quantity_dessert1: {
    type: Number,
    default: 0,
  },
  Quantity_dessert2: {
    type: Number,
    default: 0,
  },
  Quantity_dessert3: {
    type: Number,
    default: 0,
  },
  Quantity_dessert4: {
    type: Number,
    default: 0,
  },
  
  // Pizza quantities (4 types)
  Quantity_pizza1: {
    type: Number,
    default: 0,
  },
  Quantity_pizza2: {
    type: Number,
    default: 0,
  },
  Quantity_pizza3: {
    type: Number,
    default: 0,
  },
  Quantity_pizza4: {
    type: Number,
    default: 0,
  },
  
  // Cold drink quantities (4 types)
  Quantity_cold_drink1: {
    type: Number,
    default: 0,
  },
  Quantity_cold_drink2: {
    type: Number,
    default: 0,
  },
  Quantity_cold_drink3: {
    type: Number,
    default: 0,
  },
  Quantity_cold_drink4: {
    type: Number,
    default: 0,
  },
  
  // Special combo quantities (4 types)
  Quantity_special_combos1: {
    type: Number,
    default: 0,
  },
  Quantity_special_combos2: {
    type: Number,
    default: 0,
  },
  Quantity_special_combos3: {
    type: Number,
    default: 0,
  },
  Quantity_special_combos4: {
    type: Number,
    default: 0,
  },

  // Total amount for the bill
  totalAmount: {
    type: Number,
    required: true,
  },
});

export const Bill = mongoose.model("Bill", billSchema);



