import express from 'express';
import { addReservation, checkInReservation, deleteReservation, getReservations, updateReservation } from '../services/reservations';


const router = express.Router();

router.get('/', async (req, res) => {
   try {
    const result = await getReservations()
    if (result) {
        res.status(result.statusbar).send(result.message);
    } else {
        res.status(500).send("internal error");
    }
   } catch (error) {
            res.status(500).send("internal error");
   }
});


router.post('/', async (req, res) => {
   try {
    const reservation_data = req.body;
    const result= await addReservation(reservation_data);
    if (result) {
        res.status(result.statusbar).send(result.message);
    }
    else {
        res.status(500).send("internal error");
    }
   } catch (error) {
    console.log(error);
         res.status(500).send("internal error");
   }

});

router.put('/:id', async (req, res) => {
try {
    const id = req.params.id;
    const reservation_data = req.body;
    const result= await updateReservation({ ...reservation_data, _id: id });
    if (result) {
        res.status(result.statusbar).send(result.message);
    } else {
        res.status(500).send("internal error");
    }
     
} catch (error) {
    res.status(500).send("internal error");
}}
);

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteReservation(id);
        if (result) {
            res.status(result.statusbar).send(result.message);
        } else {
            res.status(500).send("internal error");
        }
    } catch (error) {
        res.status(500).send("internal error");
    }
});



router.put('/checkin/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const result = await checkInReservation(id);
        if (result) {
            res.status(result.statusbar).send(result.message);
        } else {
            res.status(500).send("internal error");
        }
    } catch (error) {
        res.status(500).send("internal error");
    }
})


export default router;
