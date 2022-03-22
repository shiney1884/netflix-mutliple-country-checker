import Show from './Show';

export default function Shows(props) {
    return (
        <div className='shows'>
        {props.results.length > 0 ? props.results.map(show => {
            return <Show description={show.description} name={show.name} type={show.type} img={show.image} rating ={show.rating}/>
        }) : <p>No results, modify the filters and search</p>}
        </div>
    )
}