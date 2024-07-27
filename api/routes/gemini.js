require('dotenv').config()
var express = require('express')    
var router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = await genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You will receive a prompt from the user detailing their vacation preferences, including budget, duration, weather preferences, activities they enjoy, and any special requirements. Based on this input, generate a response suggesting a destination and providing a detailed itinerary. The response should include the following properties:

    1. 'destination': An object with 'city', 'country', and 'description' (a 2-3 sentence description explaining why this destination is suitable based on the user's preferences, as well as a breakdown of estimatedCost.

    2. 'itinerary': An array of objects, each representing a day of the trip. Each object should include:
        - 'day': The day number (e.g., 1, 2, 3, etc.).
        - 'activities': An array of objects detailing planned activities for that day. Each activity should include:
          - 'type': The type of activity.
          - 'name': The name of the place or activity.
          - 'description': A brief description of the activity.
          - 'address': The location address (If no address is available, write 'No Address Available').

    3. 'ratings': An array of up to 5 attributes, based on the needs indicated by the users prompt. Each object should include:
    - 'name' : Name of the attribute
    - 'value': An accurate rating on a scale from 1 to 10, based on how well the destination meets the user's preferences.

    If you are unable to provide a destination or detailed itinerary based on the user's input, suggest a random destination and itinerary.`,
    generationConfig: { responseMimeType: "application/json" }
  });
  try {
    const result = await model.generateContent(query);
    const jsonData = JSON.parse(result.response.text());
    res.json(jsonData);
  } catch (err) {
    console.error("Failed to generate content:", err);  }
});

module.exports = router;