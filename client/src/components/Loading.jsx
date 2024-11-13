import useDocumentTitle from "./useDocumentTitle";

/*
Loader courtesy of css-loaders.com
Spinner #13
Source: https://css-loaders.com/spinner/
*/

export default function Loading() {
  useDocumentTitle("Loading...");
  return (
    <div className="loading-container">
      <div className="loading"></div>
    </div>
  );
}
