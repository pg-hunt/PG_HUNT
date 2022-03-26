import express from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';

config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
