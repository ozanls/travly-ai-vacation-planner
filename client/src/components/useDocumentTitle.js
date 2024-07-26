import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Travly`;
  }, [title]);
};

export default useDocumentTitle;