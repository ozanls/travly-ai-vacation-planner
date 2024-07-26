import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

export default function Day (props){

    return(
        <div className="day">
            <p className="day__header">Day {props.day}</p>
            <ul className="day__activities">
                {props.activities.map((activity, index) => (
                    <li key={index} className="day__activity">
                        <h3 className="day__activity__type">{activity.name} ({activity.type})</h3>
                        <h3 className="day__activity__address"><FontAwesomeIcon icon={faLocationPin} /> {activity.address}</h3>
                        <h3 className="day__activity__description">{activity.description}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}