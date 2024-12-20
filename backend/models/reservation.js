import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minLength: [3, "First name must be of at least 3 Characters."],
    maxLength: [30, "First name cannot exceed 30 Characters."],
  },
  date: {
    type: String,
    required: true, // this is added by systems software only
  },
  time: {
    type: String,
    required: true, // this is added by systems software only
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"], // user can get 2% discount if attach there email as well
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain 10 Digits."],
    maxLength: [10, "Phone number must contain 10 Digits."],
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);