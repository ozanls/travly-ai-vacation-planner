/* 
Using Google Places API
Docs:  https://developers.google.com/maps/documentation/places/web-service/overview
*/

require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const router = express.Router();

// GET request to Google Places API
router.get('/', async (req, res) => {
  const { query } = req.query;
  const googlePlacesApiKey = process.env.GOOGLEMAPS_API_KEY;  
  const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&key=${googlePlacesApiKey}&inputtype=textquery&fields=name,photos`;
  const jsonOptions = { method: 'GET', headers: { accept: 'application/json' } };

  // Fetch place data from Google Places API
  try {
    const findPlaceResponse = await fetch(findPlaceUrl, jsonOptions);
    const findPlaceData = await findPlaceResponse.json();

    // If no places are found, return an error
    if (findPlaceData.candidates.length === 0 || !findPlaceData.candidates[0].photos) {
      return res.status(404).json({ error: 'No photos found for the given place' });
    }
    
    // Fetch photo data from Google Places API
    const photoReference = findPlaceData.candidates[0].photos[0].photo_reference;
    const photoAttribution = findPlaceData.candidates[0].photos[0].html_attributions[0];
    
    // Construct the URL for the photo
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${encodeURIComponent(photoReference)}&key=${googlePlacesApiKey}&maxwidth=1600&maxheight=1600`;
    const photoResponse = await fetch(photoUrl);

    // If the response is not ok, throw an error
    if (!photoResponse.ok) {
      throw new Error('Failed to fetch photo');
    }

    // Pipe the photo response to the client
    photoResponse.body.pipe(res);

    // If there is an error, set the error state
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;