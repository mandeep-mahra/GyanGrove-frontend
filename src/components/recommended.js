import { useEffect, useRef, useState } from "react";
import pin from "../resources/pin.svg"
import "../stylesheets/recommended.css";

function extractGoogleDriveId(url) {
    var id = null;
    if (url.includes("/d/")) {
        id = url.split("/d/")[1].split("/")[0];
    } else if (url.includes("id=")) {
        id = url.split("id=")[1].split("&")[0];
    }
    return id;
}

export default function Recommended(){
    const [events, setEvents] = useState([]);
    const containerRef = useRef(null);

    useEffect(()=>{
        fetch("https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco")
        .then((res) => res.json())
        .then((res) => {
            res.events.map((curr) => {
                curr.id = extractGoogleDriveId(curr.imgUrl);
                const time = new Date(curr.date);
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',  
                month: 'short',  
                day: 'numeric',  
                }).format(time);
                curr.timestamp = formattedDate;
                curr.distanceKm = Math.round(parseInt(curr.distanceKm));
            })
            setEvents(res.events);
            console.log(res.events);
        });
    }, [])

    useEffect(() => {
        const handleWheel = (e) => {
          if (e.deltaY !== 0) {
            containerRef.current.scrollLeft += e.deltaY;
            e.preventDefault();
          }
        };
    
        containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
    
        return () => {
          containerRef.current.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return(
        <div className="recommended-container">
            <div className="shows-title">
                Recommended shows {`→`}
            </div>
            <div className="cards" ref={containerRef}>
                {events.map((event) => (
                    <div className="card">
                        <img className="cardimg" alt = {event.id} src = {`https://drive.google.com/thumbnail?id=${event.id}`}/>
                        <div className="info-event">
                            <div className="left-info">
                                <div className="card-title">
                                    {event.eventName}
                                </div>
                                <div className="center-content-left">
                                    <img className = "small" src={pin} />
                                    {event.cityName}
                                </div>
                            </div>
                            <div className="right-info">
                                <div className="cardtime">
                                    {event.timestamp}
                                </div>
                                {event.weather} | {event.distanceKm + "km"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}