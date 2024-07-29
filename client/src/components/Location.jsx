import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Location(props) {
    return (
        <div className={"location"}>
            {props.address.street1 && (<p className="location__address"><span className='location-icon'><FontAwesomeIcon icon={faLocationDot} /></span> {props.address.street1}</p>)}
            <h3 className="location__name">{props.name}</h3>
            <p className="location__city">{props.address.city}, {props.address.country}</p>
        </div>
    )
}   



