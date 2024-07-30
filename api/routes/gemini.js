/* 
Using Google Places API
Docs:  https://ai.google.dev/gemini-api/docs
*/

require('dotenv').config()
var express = require('express')    
var router = express.Router();

// GET request to Gemini AI API
router.get('/', async (req, res) => {
  const { query } = req.query;
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = await genAI.getGenerativeModel({
    
    // Gemini model to use
    model: 'gemini-1.5-flash',

    // Prompt for the Gemini model
    systemInstruction: `You will receive a prompt from the user detailing their vacation preferences, including budget, duration, weather preferences, activities they enjoy, and any special requirements. Based on this input, generate a response suggesting a destination and providing a detailed itinerary. The response should include the following properties:

    1. 'destination': An object with 'city', 'country', and 'description' (a 2-3 sentence description explaining why this destination is suitable based on the user's preferences, as well as a breakdown of estimatedCost. Instead of 'United Kingdom', specify which country in the United Kingdom. Abbreviate the United States to USA).

    2. 'ratings': An array of 4 attributes that best match the users destination preferences. Each object should include:
    - 'name' : Name of the attribute (1 word)
    - 'value': An accurate rating on a scale from 1 to 10, based on how well the destination meets the user's preferences.

    3. 'itinerary': An array of objects, each representing a day of the trip. Each object should include:
        - 'day': The day number (e.g., 1, 2, 3, etc.).
        - 'activities': An array of objects detailing planned activities for that day. Each activity should include:
          - 'type': The type of activity.
          - 'name': The name of the place or activity.
          - 'description': A brief description of the activity.
          - 'address': The location address (If no address is available, don't include this).

    If you are unable to provide a destination or detailed itinerary based on the user's input, suggest a random destination and itinerary.`,
    generationConfig: { responseMimeType: "application/json" }
  });

  // Generate content using the user input as the query
  try {
    const result = await model.generateContent(query);
    const jsonData = JSON.parse(result.response.text());
    res.json(jsonData);

    // If there is an error, set the error state
  } catch (err) {
    console.error("Failed to generate content:", err);  }
});

module.exports = router;