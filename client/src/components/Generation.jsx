import React, { useState, useEffect } from 'react';
import Question from './Question';
import Response from './Response';
import Loading from './Loading';
import Error from './Error';


export default function Generation() {
  const [geminiData, setGeminiData] = useState(null);
  const [tripadvisorData, setTripadvisorData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Fetch data from Gemini API
  useEffect(() => {
    if (!submitted) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/gemini?query=${userInput}`);
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve Gemini data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const result = await response.json();
        setGeminiData(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchData();
  }, [submitted, userInput]);


  // Fetch data from TripAdvisor API
  useEffect(() => {
    if (!geminiData) return;
    const fetchData = async () => {
      try {
        const query = `${geminiData.destination.city}, ${geminiData.destination.country}`;
        const response = await fetch(`http://localhost:9000/tripadvisor?query=${query}`);
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve TripAdvisor data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const result = await response.json();
        setTripadvisorData(result);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
  };
    fetchData();
  }, [geminiData]);


  // Fetch places data from Google Places API
  useEffect(() => {
    if (!geminiData) return;
    const fetchData = async () => {
      try {
        const query = `${geminiData.destination.city}, ${geminiData.destination.country}`;
        const response = await fetch(`http://localhost:9000/googleplaces?query=${query}`);
        if (!response.ok) {
          const errorMessage = `Error: Failed to retrieve Google Places data. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error(errorMessage);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageData(url);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
}, [geminiData]);
 
  // Check if loading is complete
  useEffect(() => { 
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
    setUserInput('');
    setSubmitted(false);
    setLoading(false);
    setError(null);
  }

  // Render logic
  return (
    <>
      {!geminiData && !tripadvisorData && !imageData && !loading && !error &&(
        <Question
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
        />
      )}
      {loading && !error &&(
        <Loading />
      )}
      {error &&(
        <Error error={error} retry={handleRetry}/>
      )}
      {geminiData && tripadvisorData && imageData && !error &&(
        <Response
          destination={geminiData.destination}
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





