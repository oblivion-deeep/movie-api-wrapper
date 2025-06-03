import { CHANNEL_IDS } from "../config/config.js";
import { getMoviesByGenreService, getMoviesBySearchService, getMovieStreamService, getMovieCaptionsService, getMovieRecommendationService } from "../services/movies.service.js";

export const getMoviesByGenreController = async (req, res) => {
  try {
    const { page  } = req.query;
    const channelName = req.query.channel;
    const genre = req.query.genre;
    const sort = req.query.sort;
    const year = req.query.year;
    const channelId = CHANNEL_IDS[channelName?.toLowerCase()];
    if (!channelId) {
      return res.status(400).json({ error: 'Invalid channel name provided.' });
    }
    const response = await  getMoviesByGenreService(page, genre, sort, year, channelId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const getMovieBySearchController = async (req, res) => {
  try {
    const { page } = req.query;
    const searchTerm = req.query.s;
    const year = req.query.year;
    if(!searchTerm) {
      return res.status(400).json({ error: 'Invalid search term provided.' });
    }
    const response = await getMoviesBySearchService(page, searchTerm, year);
    res.status(200).json(response);    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const getMovieStreamController = async (req, res) => {
  try {
    const id = req.query.id;
    const season = req.query.season;
    const episode = req.query.episode;
    const identifier = req.query.identifier;
    console.log(id, season, episode, identifier);

    if (!id) {
      return res.status(400).json({ error: "Invalid movie id provided." });
    }

    const response = await getMovieStreamService(id, season, episode, identifier);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMoviesCaptionsController = async (req, res) => {
  try {
  const movid = req.query.movieid;
  const subjectId = req.query.id;

  if (!movid) {
    return res.status(400).json({ error: "Invalid movie id provided." });
  }

  const response = await getMovieCaptionsService(movid, subjectId);
  res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getMovieRecommendationsController = async (req, res) => {
  try {
    const subjectId = req.query.id;
    const page = req.query.page;
  
    if(!subjectId) {
      return res.status(400).json({ error: "Invalid movie id provided." });
    }

    const response = await getMovieRecommendationService(subjectId, page)
    return res.status(200).json(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}