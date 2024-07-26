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


  // Fetch data from generative model API
  useEffect(() => {
    if (!submitted) return;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/gemini?query=${userInput}`);
        if (!response.ok) {
          const errorMessage = `Error: Network response was not ok. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        //console.log(result);
        setGeminiData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
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
          const errorMessage = `Error: Network response was not ok. Status: ${response.status} ${response.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        //console.log(result);
        setTripadvisorData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
  };
    setLoading(false);
    fetchData();
  }, [geminiData]);


  // Fetch places data from Google Places API
  useEffect(() => {
    if (!geminiData) return;
    const fetchImage = async () => {
      try {
        const query = `${geminiData.destination.city}, ${geminiData.destination.country}`;
        const response = await fetch(`http://localhost:9000/googleplaces?query=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        console.log(blob);
        const url = URL.createObjectURL(blob);
        console.log(url);
        setImageData(url);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchImage();
}, [geminiData]);


    // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
  };


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
        <Error error={error}/>
      )}
      {geminiData && tripadvisorData && !error &&(
        <Response
          destination={geminiData.destination}
          image={imageData}
          itinerary={geminiData.itinerary}
          ratings={geminiData.ratings}
          locations={tripadvisorData.data}
        />
      )}
    </>
  );
}





