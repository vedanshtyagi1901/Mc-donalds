import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        minLength: [3, "Image path must be of at least 3 characters."],
        maxLength: [100, "Image path cannot exceed 30 characters."],
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // Change to Number
        required: true,
    },
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
export default MenuItem; // Default export
