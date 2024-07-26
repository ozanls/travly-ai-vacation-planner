require('dotenv').config()
var express = require('express')    
var router = express.Router();

router.get('/', async (req, res) => {
    const { query } = req.query;
    const tripadvisorApiKey = process.env.TRIPADVISOR_API_KEY;
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${tripadvisorApiKey}&searchQuery=${encodeURIComponent(query)}&language=en`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
 
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;