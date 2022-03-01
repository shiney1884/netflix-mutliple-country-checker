import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Country from './Country';
import Shows from './Shows';
import Filters from './Filters';

export default function App() {

  const [filters, setFilters] = useState({countries: [29, 46], type: 'movie', sYear: 2022, eYear: 2022, sortBy: 'Rating'})
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
    

    //   useEffect(() => {
    //     axios.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi", {
    //       params: {
    //         q: `\'\'-!${filters.sYear},${filters.eYear}-!0,500-!0,500-!0-!${filters.type}-!any-!Any-!gt0-!{downloadable}`,
    //         t: 'ns',
    //         cl: `${filters.countries.join(',')}`,
    //         st: 'adv',
    //         ob: `${filters.sortBy}`,
    //         p: '1',
    //         sa: 'or'
    //       },
    //         headers: {
    //         'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
    //         'x-rapidapi-key': 'e14e0779c1mshb588041296e6664p1507c2jsn8f48804c2873'
    //       }
    //     }).then(response => setResults(response.data.ITEMS))
    // }, [])

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
      <Filters countries={countries} filters={filters} setFilters={setFilters}/>
      <Shows results={results}/>
    </div>
  );

}
