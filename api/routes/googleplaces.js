require('dotenv').config()
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  const googlePlacesApiKey = process.env.GOOGLEMAPS_API_KEY;  
  const jsonOptions = { method: 'GET', headers: { accept: 'application/json' } };
  const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&key=${googlePlacesApiKey}&inputtype=textquery&fields=name,photos`;

  try {
    const findPlaceResponse = await fetch(findPlaceUrl, jsonOptions);
    const findPlaceData = await findPlaceResponse.json();

    const photoReference = findPlaceData.candidates[0].photos[0].photo_reference;
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${encodeURIComponent(photoReference)}&key=${googlePlacesApiKey}&maxwidth=700&maxheight=700`;
    const photoOptions = { method: 'GET', headers: { accept: 'image/*' } };

    try {
      const photoResponse = await fetch(photoUrl, photoOptions);
      const photoData = await photoResponse.blob();
      res.send(photoData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;