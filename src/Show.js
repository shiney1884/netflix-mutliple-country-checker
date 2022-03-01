export default function Show(props) {
    return (
        <div className="show">
            <img className="bg-img" src={props.img} alt={`${props.title} Image`} />
            <div className="info">
                <div className="rating">{props.rating > 0 ? props.rating : 'N/A'}</div>
                <div className="show-type">{props.type.toLowerCase() === 'series' ? 'S' : 'M'}</div>
            </div>
        </div>
    )
}