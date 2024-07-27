import React from 'react';

export default function Question({ userInput, setUserInput, handleSubmit }) {     
    
    return (
        <div className="question-container">
            <div className="question">
                <h1 className="question__header">What's your ideal destination?</h1>
                <h2 className="question__description">
                    Describe your vacation preferences: budget, duration, weather, activities, and any special needs. We'll suggest a destination and provide a detailed itinerary.
                </h2>
                <form className="question__form" onSubmit={handleSubmit}>
                <textarea className="question__form__textarea"
                    id="user-prompt"
                    name="user-prompt"
                    rows="4"
                    cols="50"
                    placeholder="I'm looking for a relaxing beach with good food and plenty of sunshine."
                    required
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <input className="button" type="submit" value="Find my destination" />
                </form>
            </div>
        </div>
    )
}