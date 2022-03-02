import Select from "react-select"
import {useState} from "react"
import axios from "axios"

export default function Filters(props) {

    const [countryFilter, setCountryFilter] = useState(null)
    const [typeFilter, setTypeFilter] = useState('movie')
    const [sYearFilter, setSYearFilter] = useState(1900)
    const [eYearFilter, setEYearFilter] = useState(2021)
    const [sortByFilter, setSortByFilter] = useState('Relevance')

    const handleCountryChange = (e) => {
        setCountryFilter(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    function handleSortByChange(selected) {
        setSortByFilter(selected.value)
    }

    function handleTypeChange(selected) {
        setTypeFilter(selected.value)
    }

    function handleSYearChange(e) {
        setSYearFilter(e.target.value)
    }

    function handleEYearChange(e) {
        setEYearFilter(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi", {
          params: {
            q: `\'\'-!${sYearFilter},${eYearFilter}-!0,500-!0,500-!0-!${typeFilter}-!any-!Any-!gt0-!{downloadable}`,
            t: 'ns',
            cl: `${countryFilter.length > 0 ? countryFilter.join(',') : 78}`,
            st: 'adv',
            ob: `${sortByFilter}`,
            p: '1',
            sa: 'or'
          },
            headers: {
            'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
            'x-rapidapi-key': 'e14e0779c1mshb588041296e6664p1507c2jsn8f48804c2873'
          }
        }).then(response => props.setResults(response.data.ITEMS))

    }

    console.log(`${countryFilter} - ${typeFilter} - ${sYearFilter} - ${eYearFilter} - ${sortByFilter}`)

    const countries = props.countries.map(country => {
        const [value,,label] = country
        const obj = {value, label}
        return obj
    })

    const countryOptions = countries
    const typeOptions = [
        {value: 'movie', label: 'Movie'},
        {value: 'series', label: 'Series'},
        {value: 'any', label: 'Any'}
    ]
    const sortByOptions = [
        {value: 'Relevance', label: 'Relevance'},
        {value: 'Date', label: 'Release Date'},
        {value: 'Rating', label: 'Rating'},
        {value: 'Title', label: 'Name'}
    ]
 
    return(
        <form onSubmit={handleSubmit} className="filters">
            <Select onChange={handleCountryChange} placeholder='What countries do you want to mix?' className='drop-down-filter longer' options={countryOptions} isMulti/>
            <Select onChange={handleTypeChange} placeholder='What type of content do you want to watch?' className='drop-down-filter' options={typeOptions}/>
            <Select onChange={handleSortByChange} placeholder='Sort the results by...' className='drop-down-filter' options={sortByOptions}/>
            <input onChange={handleSYearChange} placeholder="Start Year" className="date-input" type='number' name="sDate"/>
            <input onChange={handleEYearChange} placeholder="End Year" className="date-input" type='number' name="eDate"/>
            <button type="submit">Search</button>
        </form>
    )
}