import { getCol } from '../../db/mongo.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const col = await getCol('companies');
    const companies = await col.find().toArray();
    res.send(companies);
  } catch (err) {
    console.log(err);
  }
});

router.get('/wdcoperations', async (req, res) => {
  try {
    const col = await getCol('companies');
    const company = await col.findOne({ name: 'WDC Operations' });
    res.send(company);
  } catch (error) {
    console.log(error);
  }
});

export default router;
