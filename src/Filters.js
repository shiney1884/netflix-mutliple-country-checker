import Select from "react-select"

export default function Filters(props) {

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
        <div className="filters">
            <Select placeholder='What countries do you want to mix?' className='drop-down-filter longer' options={countryOptions} isMulti/>
            <Select placeholder='What type of content do you want to watch?' className='drop-down-filter' options={typeOptions}/>
            <Select placeholder='Sort the results by...' className='drop-down-filter' options={sortByOptions}/>
            <input placeholder="Start Year" className="date-input" type='number' name="sDate"/>
            <input placeholder="End Year" className="date-input" type='number' name="eDate"/>
            <button type="submit">Search</button>
            {/* <ul>
                {props.countries.map(country => {
                   return <li id={country[0]}>{country[2]}</li>
                })}
            </ul> */}
        </div>
    )
}