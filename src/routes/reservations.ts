import express from 'express';
import { getReservations } from '../services/reservations';


const router = express.Router();

router.get('/', async (req, res) => {
    const reservations = await getReservations()
    res.send(reservations);
});