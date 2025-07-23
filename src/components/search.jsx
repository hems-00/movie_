import React from 'react'

const Search = ({searchterm,setsearchterm}) =>{
    return (
        <div className = "search">
        <div>
            <img src="./search.svg" alt= "search" />
        <input 
            type="text"
            placeholder="Find your choice from thousands..."
            value = {searchterm}
            onChange ={(event) => setsearchterm(event.target.value)}
            style={{fontStyle : 'italic'}}

        />
        </div>    
        
        </div>
    
    )
}

export default Search


// function Search({ searchterm, setsearchterm }) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newTerm = e.target.elements.search.value.trim();
//     if (newTerm) {
//       setsearchterm(newTerm);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-5">
//     <div>
//         <div className="search">
//         <img src="./search.svg" alt="search" className="w-5 h-5" />
//         <input
//           name="search"
//           type="text"
//           placeholder="Search"
//           defaultValue={searchterm}
//           style={{ fontStyle: "italic" }}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               e.target.form.requestSubmit(); // Submit form on Enter
//             }
//           }}
//         />
//       </div>
//     </div>
      
//     </form>
//   );
// }

// export default Search;
