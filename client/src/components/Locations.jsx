import Location from './Location';
import tripadvisorLogo from '../../public/tripadvisor.png';

export default function Locations(props) {

    if (!props.locations) {
        return <></>
    }
    return(
        <>
        <h2 className='container-title'>Places to visit in {props.destination.city}</h2>
        <div className='container-attribution'> 
          <p>Results provided by:</p> 
          <img className="tripadvisor-logo" src={tripadvisorLogo}></img>
        </div>
        { <div className="locations">
        {props.locations.map((location, index) => (
          <Location 
            key={index}
            name={location.name}
            address={location.address_obj}
          />
        ))}
        </div> }
        </>
    )
} 