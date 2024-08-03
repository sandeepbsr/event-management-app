const express = require('express');
const axios = require('axios');
const router = express.Router();

const weatherApiKey = process.env.WEATHER_API_KEY || 'your_weather_api_key';

router.get('/:location', async (req, res) => {
  const { location } = req.params;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
