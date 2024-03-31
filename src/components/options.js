import { useEffect, useState } from "react";
import pin from "../resources/pin.svg"
import '../stylesheets/options.css'

function List(){
    return(
        <div className="optionlist">
            <ul type = "none">
                <li>Live shows</li>
                <li>Streams</li>
                <li>Movies</li>
                <li>Plays</li>
                <li>Events</li>
                <li>Sports</li>
                <li>Activities</li>
            </ul>
        </div>
    )
}

export default function Options(){
    const [width, setWindowDimensions] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
        setWindowDimensions(window.innerWidth);
        }
  
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return(
        <>
        <div className="container">
            <div className="center-content subtitle">
                <img src = {pin}/>
                Mumbai, India {'>'} 
            </div>
            {(width > 900)?<div className="right"><List/></div>:<></>}  
        </div>    
        {(width < 900)?<div className="left"><List/></div>:<></>}
        </>
    )
}