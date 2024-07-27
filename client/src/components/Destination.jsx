export default function Destination (props) {

    const redirectTripadvisor = () => { 
        const query = `${props.destination.city}, ${props.destination.country}`;
        window.open(`https://www.tripadvisor.ca/Search?q=${encodeURIComponent(query)}`);
    }

    return (
    <>
    <div className="destination" style={{ backgroundImage: `url(${props.image})`}} >
        <div className="destination__details">
            <h1 className="destination__details__name">{props.destination.city}, {props.destination.country}</h1>
            <h2 className="destination__details__description">{props.destination.description}</h2>
            <div className="destination__details__buttons">
                <button className="button-2" onClick={props.retry}>Search Again</button>
                <button className="button" onClick={redirectTripadvisor}>Discover {props.destination.city}</button>
            </div>
        </div> 
    </div>
    </>
    )
}