// import { useEffect, useState } from "react";
// import { useParams, useLocation, Navigate } from "react-router-dom";

import { Navigate } from "react-router-dom";

const SearchResultsPageError = () => {
  //   const { category } = useParams();
  //   const location = useLocation();
  //   const [results, setResults] = useState([]);

  //   useEffect(() => {
  //     if (category) {
  //       const fetchData = async () => {
  //         // Mock API call
  //         const response = await fetch(`/api/search?category=${category}`);
  //         const data = await response.json();
  //         setResults(data);
  //       };

  //       fetchData();
  //     }
  //   }, [category]);

  //   if (category) {
  //     return (
  //       <div>
  //         <h1>Search Results for: {category}</h1>
  //         <ul>
  //           {results.map((result) => (
  //             <li key={result.id}>{result.title}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <h1>Search Results Page</h1>
  //         <p>Please enter a category to see the results.</p>
  //       </div>
  //     );
  //   }

  return <Navigate to="/" />;
};

export default SearchResultsPageError;
