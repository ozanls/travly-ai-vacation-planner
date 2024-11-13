import Location from "./Location";
import tripadvisorLogo from "/tripadvisor.svg";

export default function Locations(props) {
  if (!props.locations) {
    return <></>;
  }

  const redirectTripadvisor = () => {
    window.open(`https://www.tripadvisor.com/`);
  };

  return (
    <>
      <h2 className="container-title">
        Places to visit in {props.destination.city}
      </h2>
      <div className="container-attribution">
        <p>Results provided by</p>
        <img
          className="tripadvisor-logo"
          src={tripadvisorLogo}
          onClick={redirectTripadvisor}
          alt="TripAdvisor logo"
        ></img>
      </div>
      {
        <div className="locations">
          {props.locations.slice(0, 9).map((location, index) => (
            <Location
              key={index}
              name={location.name}
              address={location.address_obj}
            />
          ))}
        </div>
      }
    </>
  );
}
