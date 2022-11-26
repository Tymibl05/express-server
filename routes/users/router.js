import { getCol } from '../../db/mongo.js';
import { ObjectId } from 'mongodb';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const col = await getCol('users');
    const users = await col.find().toArray();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const col = await getCol('users');
    const user = await col.findOne({ _id: ObjectId(id) });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

export default router;
