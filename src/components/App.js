
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query,setQuery] = useState("");
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const[error,setError] = useState(null);
  const movieSearch =  () =>{
    setIsLoading(true);
     setData([])
      setError(null)
      const response =  fetch(`https://www.omdbapi.com/?s=${query}&apikey=61e718e9`);
      response.then(json => json.json()).then(res =>{
        if(res.Error){
          setError(res.Error);
         
        } 
        else {
       
        setData(res.Search) 
      
        }
        setIsLoading(false);
     
    })
      
  }
  return (
    <div>
      <div>
        <h4>Movie Search</h4>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={movieSearch}>Search</button>
      </div>
      {isLoading && <p>Loading....</p>}
      <ul>

      
      {
        
        data.length > 0 && !isLoading &&
        data.map((m )=> {
          return <li key={m.imdbID}>
            <h3>{m.Title + "( " + m.Year + " )"}</h3>
            <img src={m.Poster || ''} alt={m.Title} />
              
          </li>
        } )  
      }
      </ul>
      {error && <p>{error}</p>}
    </div>
  )
}

export default App
