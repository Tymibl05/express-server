import { connectDb } from './db/mongo.js';
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users/router.js';
import companiesRouter from './routes/companies/router.js';
import requestsRouter from './routes/requests/router.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
  connectDb();
});

app.get('/visitor-kiosk/', (req, res) => console.log('Home Route'));
app.use('/visitor-kiosk/users', usersRouter);
app.use('/visitor-kiosk/companies', companiesRouter);
app.use('/visitor-kiosk/requests', requestsRouter);
