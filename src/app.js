import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import movieRoutes from './routes/movieRoutes.js';


dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());


app.use('/api/movies', movieRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to the Movie API!'
  });
});


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

export default app;