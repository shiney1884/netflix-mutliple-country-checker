import { useState } from "react"

export default function Show(props) {

    const [isHovering, setIsHovering] = useState(false)

    function handleMouseEnter() {
        setIsHovering(true)
    }

    function handleMouseLeave() {
        setIsHovering(false)
    }

    // function setClasses() {
    //     return `hover-content ${isHovering ? '' : 'hidden'}`
    // }

    return (
        <div className="show">
            <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className="image-content">
                <img className="bg-img" src={props.img} alt={`${props.title}`} />
                <div className={`hover-content ${isHovering ? '' : 'hidden'}`}>
                    <h4>{props.name}</h4>
                    <p className="hover-p-text">{props.description}</p>
                </div>
            </div>
            <div className="info">
                <div className="rating">{props.rating > 0 ? props.rating : 'N/A'}</div>
                <div className="show-type">{props.type.toLowerCase() === 'series' ? 'S' : 'M'}</div>
            </div>
        </div>
    )
}