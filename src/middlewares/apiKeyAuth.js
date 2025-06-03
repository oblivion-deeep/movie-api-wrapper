import dotenv from 'dotenv';

dotenv.config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  
  if (!apiKey) {
    return res.status(401).json({
      status: 'error',
      message: 'API key is missing'
    });
  }
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid API key'
    });
  }
  
  next();
};

export default apiKeyAuth;