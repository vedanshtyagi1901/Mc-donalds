import express from "express";
import send_reservation from "../controller/reservation.js";
import { getMenuItems } from "../controller/menu.js";
import { getMenuItemById } from '../controller/menuAdmin.js';
import { createMenuItem } from "../controller/CreateMenuItem.js";

const router = express.Router();

// Routes
router.post("/send", send_reservation);
router.get("/get_data", getMenuItems);
router.get('/menu/:id', getMenuItemById);
router.post('/create-menu/:id', createMenuItem); // Modified to include :id

export default router;
