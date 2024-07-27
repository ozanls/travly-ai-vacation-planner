/* 
Using Google Places API
Docs:  https://developers.google.com/maps/documentation/places/web-service/overview
*/

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  const googlePlacesApiKey = process.env.GOOGLEMAPS_API_KEY;  
  const jsonOptions = { method: 'GET', headers: { accept: 'application/json' } };
  const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&key=${googlePlacesApiKey}&inputtype=textquery&fields=name,photos`;

  try {
    const findPlaceResponse = await fetch(findPlaceUrl, jsonOptions);
    const findPlaceData = await findPlaceResponse.json();

    if (findPlaceData.candidates.length === 0 || !findPlaceData.candidates[0].photos) {
      return res.status(404).json({ error: 'No photos found for the given place' });
    }

    const photoReference = findPlaceData.candidates[0].photos[0].photo_reference;
    const photoAttribution = findPlaceData.candidates[0].photos[0].html_attributions[0];
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${encodeURIComponent(photoReference)}&key=${googlePlacesApiKey}&maxwidth=1600&maxheight=1600`;
    const photoResponse = await fetch(photoUrl);
    
    if (!photoResponse.ok) {
      throw new Error('Failed to fetch photo');
    }
    photoResponse.body.pipe(res);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;