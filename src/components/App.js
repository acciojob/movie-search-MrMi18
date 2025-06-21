
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query,setQuery] = useState("");
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const[error,setError] = useState(null);
  const handleSubmit =  (event) =>{
     event.preventDefault();
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
      <h3>Movie Search</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>

      <ul>

      
      {
        
         data.length===0 ? <p className="error">{error || "Invalid movie name. Please try again."}</p> :
        data.map((m )=> {
          return <li key={m.imdbID}>
            <h3>{m.Title + "( " + m.Year + " )"}</h3>
            <img src={m.Poster || ''} alt={m.Title} />
              
          </li>
        } )  
      }
      </ul>
      
    </div>
  )
}

export default App

