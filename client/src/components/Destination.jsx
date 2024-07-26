export default function Destination (props) {
    return (
    <div className="destination" style={{ backgroundImage: `url(${props.image})` }} >
    <h1 className="destination__name">{props.destination.city}, {props.destination.country}</h1>
    <h2 className="destination__description">{props.destination.description}</h2>
    </div>
    )
}