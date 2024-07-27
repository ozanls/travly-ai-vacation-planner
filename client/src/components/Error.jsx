import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

export default function Error(props) {
    return (
        <>
        <div className="error">
            <p className='error__icon'><FontAwesomeIcon icon={faSquareXmark} /></p>
            <p className="error__message"><b>Error:</b> {props.error}</p>
            <button className="button" onClick={props.retry}>Retry</button>
        </div>
        </>
    )
}