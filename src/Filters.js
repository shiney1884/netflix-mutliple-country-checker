import Select from "react-select"
import {useState} from "react"
import axios from "axios"

export default function Filters(props) {

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected
                ? '#fff'
                : '#fff',
            padding: 10
        })
    }

    const [countryFilter,
        setCountryFilter] = useState(null)
    const [typeFilter,
        setTypeFilter] = useState('movie')
    const [sYearFilter,
        setSYearFilter] = useState(1900)
    const [eYearFilter,
        setEYearFilter] = useState(2021)
    const [sortByFilter,
        setSortByFilter] = useState('Relevance')

    const handleCountryChange = (e) => {
        setCountryFilter(Array.isArray(e)
            ? e.map(x => x.value)
            : []);
    }

    function handleSortByChange(e) {
        setSortByFilter(e.value)
    }

    function handleTypeChange(e) {
        setTypeFilter(e.value)
    }

    function handleSYearChange(e) {
        setSYearFilter(e.target.value)
    }

    function handleEYearChange(e) {
        setEYearFilter(e.target.value)
    }

    // function removeSpecialChars(str) {
    //     return str.replace(/(?!\w|\s)./g, '')
    //         .replace(/\s+/g, ' ')
    //         .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
    // }

    // eslint-disable-next-line no-extend-native
    String.prototype.unescapeHtml = function () {
        var temp = document.createElement("div");
        temp.innerHTML = this;
        var result = temp.childNodes[0].nodeValue;
        temp.removeChild(temp.firstChild);
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault()

        axios.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi", {
            params: {
                q: `''-!${sYearFilter},${eYearFilter}-!0,500-!0,500-!0-!${typeFilter}-!any-!Any-!gt0-!{downloadable}`,
                t: 'ns',
                cl: `${countryFilter.length > 0
                    ? countryFilter.join(',')
                    : 78}`,
                st: 'adv',
                ob: `${sortByFilter}`,
                p: '1',
                sa: 'or'
            },
            headers: {
                'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
                'x-rapidapi-key': 'e14e0779c1mshb588041296e6664p1507c2jsn8f48804c2873'
            }
        }).then(response => props.setResults(response.data.ITEMS.map(content => {
            return {
                name: content['title'].unescapeHtml(),
                type: content['type'],
                image: content['image'],
                description: content['synopsis'].unescapeHtml(),
                rating: content['rating']
            }
        })))

    }

    // then(response => props.setResults(response.data.ITEMS))

    const countries = props
        .countries
        .map(country => {
            const [value,,
                label] = country
            const obj = {
                value,
                label
            }
            return obj
        })

    const countryOptions = countries
    const typeOptions = [
        {
            value: 'movie',
            label: 'Movie'
        }, {
            value: 'series',
            label: 'Series'
        }, {
            value: 'Any',
            label: 'Any'
        }
    ]
    const sortByOptions = [
        {
            value: 'Relevance',
            label: 'Relevance'
        }, {
            value: 'Date',
            label: 'Release Date'
        }, {
            value: 'Rating',
            label: 'Rating'
        }, {
            value: 'Title',
            label: 'Name'
        }
    ]

    return (
        <form onSubmit={handleSubmit} className="filters-container">
            <div className="filters">
                <p>
                    Search these countries
                </p>
                <Select
                    onChange={handleCountryChange}
                    styles={customStyles}
                    theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        neutral0: '#1a1919',
                        primary25: '#9A0680',
                        dangerLight: '#9A0680',
                        danger: 'white',
                        primary: '#9A0680'
                    }
                })}
                    placeholder='click for options'
                    className='drop-down-filter'
                    options={countryOptions}
                    isMulti/>
                <p>for this content</p>
                <Select
                    onChange={handleTypeChange}
                    styles={customStyles}
                    placeholder='click for options'
                    className='drop-down-filter'
                    theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        neutral0: '#1a1919',
                        neutral160: '#fff',
                        primary25: '#9A0680',
                        primary: '#9A0680',
                        neutral80: '#fff'
                    }
                })}
                    options={typeOptions}/>
                <p>and sort the results by</p>
                <Select
                    onChange={handleSortByChange}
                    styles={customStyles}
                    placeholder='click for options'
                    className='drop-down-filter'
                    theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        neutral0: '#1a1919',
                        neutral160: '#fff',
                        primary25: '#9A0680',
                        primary: '#9A0680',
                        neutral80: '#fff'
                    }
                })}
                    options={sortByOptions}/>
                <p>The content should have been release between</p>
                <input
                    onChange={handleSYearChange}
                    placeholder="type the year"
                    className="date-input"
                    type='number'
                    name="sDate"/>
                <p>and</p>
                <input
                    onChange={handleEYearChange}
                    placeholder="type the year"
                    className="date-input"
                    type='number'
                    name="eDate"/>
            </div>
            <button type="submit">Go find this for me.</button>
        </form>
    )
}