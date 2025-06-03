import axios from "axios";
import dotenv from "dotenv";
import { ENDPOINTS } from "../config/config.js";
import UserAgent from "user-agents";

dotenv.config();

const filter = ENDPOINTS.MOVIE_FILTER;

function getRandomUserAgent() {
  const isMobile = Math.random() < 0.5;
  return new UserAgent({ deviceCategory: isMobile ? "mobile" : "desktop" });
}

export const getMoviesByGenreService = async (
  page,
  genre,
  sort,
  year,
  channelId
) => {
  try {
    const userAgent = getRandomUserAgent();

    const requestBody = {
      page,
      ...(genre && { genre }),
      ...(sort && { sort }),
      ...(year && { year }),
      channelId,
      perPage: 18,
    };
    console.log(requestBody);

    const response = await axios.post(filter, requestBody, {
      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en;q=0.9",
        priority: "u=1, i",
        "user-agent": userAgent.toString(),
        "sec-ch-ua": "Chromium;v=136, Google Chrome;v=136, Not.A/Brand;v=99",
        "sec-ch-ua-mobile":
          userAgent.data.deviceCategory === "mobile" ? "?1" : "?0",
        "sec-ch-ua-platform": userAgent.data.platform || "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-info": '{"timezone":"Africa/Lagos"}',
        "x-source": "",
        "referrer-policy": "strict-origin-when-cross-origin",
      },
    });

    const movies =
      response.data?.data?.items?.map((item) => ({
        _id: item.subjectId,
        type: item.subjectType,
        title: item.title,
        releaseDate: item.releaseDate,
        genre: item.genre?.split(",") || [],
        country: item.countryName,
        rating: item.imdbRatingValue,
        poster_path: item.cover,
        identifier_id: item.detailPath,
        resources: item.hasResource,
        ops: item.ops,
        movie_duration: item.duration,
        movie_sub: item.subtitles?.split(",") || [],
        cast: item.staffList?.map((staff) => ({
          id: staff.staffId,
          name: staff.name,
          profile_path: staff.avatarUrl,
          role: staff.character,
          detail: staff.detailPath,
        })),
      })) || [];

    return {
      pageInfo: response.data.data.pager,
      movies,
    };
  } catch (error) {
    console.error("Error fetching movies by genre:", error.message);
    throw error;
  }
};

export const getMoviesBySearchService = async (page, searchTerm, year) => {
  try {
    const userAgent = getRandomUserAgent();

    const requestBody = {
      page,
      keyword: searchTerm,
      perPage: 0,
      subjectType: 0,
    };

    const response = await axios.post(ENDPOINTS.MOVIE_SEARCH, requestBody, {
      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en;q=0.9",
        priority: "u=1, i",
        "user-agent": userAgent.toString(),
        "sec-ch-ua": "Chromium;v=136, Google Chrome;v=136, Not.A/Brand;v=99",
        "sec-ch-ua-mobile":
          userAgent.data.deviceCategory === "mobile" ? "?1" : "?0",
        "sec-ch-ua-platform": userAgent.data.platform || "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-info": '{"timezone":"Africa/Lagos"}',
        "x-source": "",
        "referrer-policy": "strict-origin-when-cross-origin",
      },
    });

    let movies =
      response.data?.data?.items?.map((item) => ({
        _id: item.subjectId,
        type: item.subjectType,
        title: item.title,
        releaseDate: item.releaseDate,
        genre: item.genre?.split(",") || [],
        country: item.countryName,
        rating: item.imdbRatingValue,
        poster_path: item.cover,
        identifier_id: item.detailPath,
        resources: item.hasResource,
        ops: item.ops,
        movie_duration: item.duration,
        movie_sub: item.subtitles?.split(",") || [],
      })) || [];

    if (year) {
      movies = movies.filter((movie) => movie.releaseDate === year);
    }

    return {
      pageInfo: response.data.data.pager,
      movies,
    };
  } catch (error) {
    console.error("Error fetching movies by search:", error.message);
    throw error;
  }
};

export const getMovieStreamService = async (
  id,
  season = 0,
  episode = 0,
  identifier
) => {
  try {
    const userAgent = getRandomUserAgent();

    const response = await axios.get(ENDPOINTS.MOVIE_STREAM, {
      params: {
        subjectId: id,
        se: season,
        ep: episode,
      },
      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en;q=0.9",
        priority: "u=1, i",
        "user-agent": userAgent.toString(),
        "sec-ch-ua": "Chromium;v=136, Google Chrome;v=136, Not.A/Brand;v=99",
        "sec-ch-ua-mobile":
          userAgent.data.deviceCategory === "mobile" ? "?1" : "?0",
        "sec-ch-ua-platform": userAgent.data.platform || "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-info": '{"timezone":"Africa/Lagos"}',
        "x-source": "",
        referer: `https://moviebox.ng/movies/${
          identifier || ""
        }?id=${id}&scene=&page_from=suggestion&type=/movie/detail&utm_source=`,
        "referrer-policy": "strict-origin-when-cross-origin",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie stream:", error.message);
    throw error;
  }
};

export const getMovieCaptionsService = async (movid, subjectId) => {
  try {
    const userAgent = getRandomUserAgent();

    const MOVIE_CAPTION = ENDPOINTS.MOVIE_CAPTION;
    const response = await axios.get(
      `${MOVIE_CAPTION}?format=MP4&id=${movid}&subjectId=${subjectId}`,
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-GB,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "user-agent": userAgent.toString(),
          "sec-ch-ua": "Chromium;v=136, Google Chrome;v=136, Not.A/Brand;v=99",
          "sec-ch-ua-mobile":
            userAgent.data.deviceCategory === "mobile" ? "?1" : "?0",
          "sec-ch-ua-platform": userAgent.data.platform || "Windows",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-client-info": '{"timezone":"Africa/Lagos"}',
          "x-source": "",
          "referrer-policy": "strict-origin-when-cross-origin",
          Referer: "https://moviebox.ng",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie subtitles:", error.message);
    throw error;
  }
};

export const getMovieRecommendationService = async (subjectId, page = 1) => {
  try {
    const userAgent = getRandomUserAgent();
    const MOVIE_RECOMMENDATION = ENDPOINTS.MOVIE_RECOMMENDATION;
    const response = await axios.get(`${MOVIE_RECOMMENDATION}`, {
      params: {
        subjectId: subjectId,
        page: page,
        perPage: 24,
      },

      headers: {
        accept: "application/json",
        "accept-language": "en-GB,en;q=0.9",
        "content-type": "application/json",
        priority: "u=1, i",
        "user-agent": userAgent.toString(),
        "sec-ch-ua": "Chromium;v=136, Google Chrome;v=136, Not.A/Brand;v=99",
        "sec-ch-ua-mobile":
          userAgent.data.deviceCategory === "mobile" ? "?1" : "?0",
        "sec-ch-ua-platform": userAgent.data.platform || "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-info": '{"timezone":"Africa/Lagos"}',
        "x-source": "",
        "referrer-policy": "strict-origin-when-cross-origin",
        Referer: "https://moviebox.ng",
      },
    });

    let movies =
      response.data?.data?.items?.map((item) => ({
        _id: item.subjectId,
        type: item.subjectType,
        title: item.title,
        releaseDate: item.releaseDate,
        genre: item.genre?.split(",") || [],
        country: item.countryName,
        rating: item.imdbRatingValue,
        poster_path: item.cover,
        identifier_id: item.detailPath,
        resources: item.hasResource,
        ops: item.ops,
        movie_duration: item.duration,
        movie_sub: item.subtitles?.split(",") || [],
      })) || [];

    return {
      "code": 0,
      "message": "ok",
      "data": movies
    };
  } catch (error) {
    console.error("Error fetching movie subtitles:", error.message);
    throw error;
  }
};
