import React, { useState, useEffect } from "react";
import Question from "./Question";
import Response from "./Response";
import Loading from "./Loading";
import Error from "./Error";

export default function Generation() {
  const [geminiData, setGeminiData] = useState(null);
  const [tripadvisorData, setTripadvisorData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageAttribution, setImageAttribution] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from Gemini API
  useEffect(() => {

    // If the form has not been submitted, return
    if (!submitted) return;
    const fetchData = async () => {
      try {
        
        // Fetch data from Gemini API using the user input as the query
        const response = await fetch(
          `http://localhost:9000/gemini?query=${userInput}`
        );

        // If the response is not ok, throw an error
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve Gemini data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // If the response is ok, convert the response to JSON and set geminiData
        const result = await response.json();
        setGeminiData(result);

        // If there is an error, set the error state
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchData();
  }, [submitted, userInput]);

  // Fetch data from TripAdvisor API
  useEffect(() => {

    // If there is no Gemini data, return
    if (!geminiData) return;
    const fetchData = async () => {
      try {

        // Using the city and country from the Gemini data as the query, fetch data from TripAdvisor API
        const query = `${geminiData.destination.city}, ${geminiData.destination.country}`;
        const response = await fetch(
          `http://localhost:9000/tripadvisor?query=${query}`
        );

        // If the response is not ok, throw an error
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve TripAdvisor data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // If the response is ok, convert the response to JSON and set tripadvisorData
        const result = await response.json();
        setTripadvisorData(result);

        // If there is an error, set the error state
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchData();
  }, [geminiData]);

  // Fetch places data from Google Places API
  useEffect(() => {

    // If there is no Gemini data, return
    if (!geminiData) return;
    const fetchData = async () => {
      try {

        // Using the city and country from the Gemini data as the query, fetch an image from Google Places API
        const query = `${geminiData.destination.city}, ${geminiData.destination.country}`;
        const response = await fetch(
          `http://localhost:9000/googleplaces?query=${query}`
        );

        // If the response is not ok, throw an error
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve Google Places data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // If the response is ok, convert the response to JSON
        const data = await response.json();
        // Set the image and attribution data
        setImageData(data.image);
        setImageAttribution(data.attribution);
        
        // If there is an error, set the error state
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [geminiData]);

  // Check if loading is complete
  useEffect(() => {

    // If there is Gemini data, TripAdvisor data, and image data, set loading to false
    if (!geminiData || !tripadvisorData || !imageData) return;
    setLoading(false);
  }, [geminiData, tripadvisorData, imageData]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
  };

  // Handle retry button
  const handleRetry = () => {
    setGeminiData(null);
    setTripadvisorData(null);
    setImageData(null);
    setUserInput("");
    setSubmitted(false);
    setLoading(false);
    setError(null);
  };

  // Render logic
  return (
    <>
      {!geminiData && !tripadvisorData && !imageData && !loading && !error && (
        <Question
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && !error && <Loading />}
      {error && <Error error={error} retry={handleRetry} />}
      {geminiData && tripadvisorData && imageData && !error && (
        <Response
          destination={geminiData.destination}
          attribution={imageAttribution}
          image={imageData}
          retry={handleRetry}
          itinerary={geminiData.itinerary}
          ratings={geminiData.ratings}
          locations={tripadvisorData.data}
        />
      )}
    </>
  );
}
