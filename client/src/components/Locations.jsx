import Location from './Location';

export default function Locations(props) {

    if (!props.locations) {
        return <></>
    }
    return(
        <>
        <h2 className='container-title'>Places to visit in {props.destination.city}</h2>
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