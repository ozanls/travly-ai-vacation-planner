export default function Location(props) {
    return (
        <div className="location">
            <h3 className="location__name">{props.name}</h3>
            <p className="location__address">{props.address.street1}</p>
            <p className="location__city">{props.address.postalcode} {props.address.city},{props.address.country}</p>
        </div>
    )
}   