import useDocumentTitle from './useDocumentTitle'

export default function Loading() {
    useDocumentTitle('Loading...');
    return (
        <div className="loading-container">
            <div className="loading"></div>
        </div>
    )
}