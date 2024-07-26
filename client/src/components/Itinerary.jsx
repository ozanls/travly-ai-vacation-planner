import Day from './Day.jsx'

export default function Itinerary (props) {

  if (!props.itinerary) {
    return <></>
  }
    let itineraryLength = props.itinerary.length;
    return (
    <>
    <div className="itinerary">
    <h2 className="container-title">{itineraryLength} day trip to {props.destination.city}</h2>
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