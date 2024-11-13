import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Day(props) {
  return (
    <div className="day">
      <p className="day__header">Day {props.day}</p>
      <ul className="day__activities">
        {props.activities.map((activity, index) => (
          <li key={index} className="day__activity">
            {activity.address && (
              <p className="day__activity__address">
                <span className="location-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>{" "}
                {activity.address}
              </p>
            )}
            <h3 className="day__activity__name">
              {activity.name} ({activity.type})
            </h3>
            <p className="day__activity__description">{activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
