import Destination from './Destination';
import Itinerary from './Itinerary';
import Locations from './Locations';
import Ratings from './Ratings';
import useDocumentTitle from './useDocumentTitle'

export default function Response (props) {
  useDocumentTitle(`${props.destination.city}, ${props.destination.country}`);
  return (
    <>
    <Destination destination={props.destination} image={props.image} retry={props.retry}/>
    <Ratings ratings={props.ratings}/>
    <Itinerary destination={props.destination} itinerary={props.itinerary}/>
    <Locations destination={props.destination}locations={props.locations}/> 
    </>
  );
}

