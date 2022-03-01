import Show from './Show';

export default function Shows(props) {
    return (
        <div className='shows'>
        {props.results.map(show => {
            return <Show name={show.title} type={show.type} img={show.image} rating ={show.rating}/>
        })}
        </div>
    )
}