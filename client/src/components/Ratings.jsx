export default function Ratings(props) {
    return (
        <div className="ratings">
            {props.ratings.map((rating, index) => (
                    <li key={index} className="rating">
                        <h3 className="rating__name">{rating.name}</h3>
                        <h3 className="rating__value">{rating.value}/10</h3>
                    </li>
                ))}
        </div>
    )
}