import express from "express";
import send_reservation from "../controller/reservation.js";
import { getMenuItems } from "../controller/menu.js";
import { getMenuItemById } from '../controller/menuAdmin.js';
import { createMenuItem } from "../controller/CreateMenuItem.js";
import { getAllReservations } from "../controller/getReservations.js"; // Import the new controller
import { getAllBills } from "../controller/getBill.js"; // Import the new controller

const router = express.Router();

// Routes
router.post("/send", send_reservation);
router.get("/get_data", getMenuItems);
router.get('/menu/:id', getMenuItemById);
router.post('/create-menu/:id', createMenuItem); // Modified to include :id
router.get('/get-reservations', getAllReservations); // New route to fetch all reservations
router.get('/get-bills', getAllBills); // New route to fetch all reservations

export default router;
