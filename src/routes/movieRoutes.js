import express from 'express';
import apiKeyAuth from '../middlewares/apiKeyAuth.js';
import { getMoviesByGenreController, getMovieBySearchController, getMovieStreamController, getMoviesCaptionsController, getMovieRecommendationsController } from '../controllers/movies.controller.js';

const router = express.Router();

router.use(apiKeyAuth);

router.get('/movies', getMoviesByGenreController);
router.get('/search', getMovieBySearchController);
router.get('/providers', getMovieStreamController);
router.get('/subtitles', getMoviesCaptionsController);
router.get('/recommendation', getMovieRecommendationsController);


export default router;