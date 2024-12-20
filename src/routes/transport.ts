import express from 'express';
import { getTransport } from '../services/transport';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await getTransport();
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No transport found');
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});


export default router;