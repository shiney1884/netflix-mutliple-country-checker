import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Country from './Country';
import Shows from './Shows';
import Filters from './Filters';

export default function App() {
  
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
      fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=lc&q=available", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "e14e0779c1mshb588041296e6664p1507c2jsn8f48804c2873"
	}
})
      .then(response => response.json())
      .then(result => setCountries(result.ITEMS))
      .catch(err => console.error(err));
    }, [])

//       fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=''-!2022%2C2022-!0%2C500-!0%2C500-!0-!series-!Portuguese-!Any-!gt0-!%7Bdownloadable%7D&t=ns&cl=29%2C46&st=adv&ob=Rating&p=1&sa=''", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "e14e0779c1mshb588041296e6664p1507c2jsn8f48804c2873"
// 	}
// })
//       .then(response => response.json())
//       .then(result => setResults(result.ITEMS))
//       .catch(err => console.error(err));

  return (
    <div className="App">
      <Filters setResults={setResults} countries={countries}/>
      <Shows results={results}/>
    </div>
  );

}
