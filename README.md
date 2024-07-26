# Travly

## Overview

Travly is a React/Express application that uses AI to suggest vacation destinations based on user input. The application prompts the user for their vacation preferences and generates a suggested detailed itinerary, and a list of sites to visit throughout their stay. 

Travly uses Gemini, Google Places and TripAdvisor API's to generate a destination, itinerary, destination details, and photos.

## How to install and run

### Prerequisites
- Node.js
- npm

1. Inside of ../Travly/api, create a .env file, following the format of .env.example
2. From ../Travly, run this command:
    cd api
    npm i
    cd ../client
    npm i
3. To run the application, run this command from ../Travly/client:
    npm run dev

