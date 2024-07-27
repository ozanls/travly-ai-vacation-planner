import Day from './Day.jsx'

export default function Itinerary (props) {

  if (!props.itinerary) {
    return <></>
  }
    let itineraryLength = props.itinerary.length;
    return (
    <>
    <h2 className="container-title">{itineraryLength} day trip to {props.destination.city}</h2>
    <div className="itinerary">
    {props.itinerary.map((day, index) => (
      <Day 
        key={index}
        day={day.day}
        activities={day.activities}
      />
    ))}
    </div>
    </>
    )
}