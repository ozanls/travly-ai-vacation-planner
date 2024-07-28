import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

export default function Location(props) {
    return (
        <div className={`location location${props.index}`}>
            <h3 className="location__name">{props.name}</h3>
            <p className="location__address">{props.address.street1}</p>
            <p className="location__city">{props.address.city}, {props.address.country}</p>
        </div>
    )
}   



