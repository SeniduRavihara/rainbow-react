// import algoliasearch from "algoliasearch/lite";
// import { Highlight, Hits, InstantSearch, RefinementList, SearchBox } from "react-instantsearch";

// const searchClient = algoliasearch(
//   "6K67WTIHLT",
//   "0cb3cddf578f097566b65642564992dc"
// );

// function Hit({ hit }) {
//   return (
//     <article>
//       {/* <img src={hit.image} alt={hit.name} /> */}
//       <p>{hit.address}</p>
//       <h1>
        
//         <Highlight attribute="name" hit={hit} />
//       </h1>
//       <h1>{hit.title}</h1>
//       {/* <p>${hit.price}</p> */}
//     </article>
//   );
// }

// const TestSearch = () => {
//   return (
//     <InstantSearch searchClient={searchClient} indexName="stores" insights>
//       <SearchBox />
//       <RefinementList attribute="title" />
//       <Hits hitComponent={Hit} />
//     </InstantSearch>
//   );
// };
// export default TestSearch;
