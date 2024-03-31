import { useEffect, useState } from "react";
import pin from "../resources/pin.svg";
import '../stylesheets/upcoming.css'
import InfiniteScroll from 'react-infinite-scroll-component';

function extractGoogleDriveId(url) {
    var id = null;
    if (url.includes("/d/")) {
        id = url.split("/d/")[1].split("/")[0];
    } else if (url.includes("id=")) {
        id = url.split("id=")[1].split("&")[0];
    }
    return id;
}

export default function Upcoming(){
    const [events, setEvents] = useState([]);
    const [pagenumber, setPagenumber] = useState(1);
    const [width, setWindowDimensions] = useState(window.innerWidth);
    
    useEffect(() => {
        function handleResize() {
        setWindowDimensions(window.innerWidth);
        }
  
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = ()=>{
        fetch(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${pagenumber}&type=upcoming`)
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
            const newEvents = res.events;
            setEvents((prevEvents) => [...prevEvents, ...newEvents]);
            setPagenumber(pagenumber+1);
        });
    };
   

    return (
        <div className = "upcoming-container">
            <div className="shows-title black">
                Upcoming shows {`→`}
            </div>
            <div className="upcoming-cards">
                <InfiniteScroll
                className="upcoming-cards"
                dataLength={events.length}
                next={fetchData}
                hasMore={true}
                loader={<></>}
                >
                {events.map((event) => (
                    <div className="upcoming-card">
                        <div className="image-container">
                            <img className="upcoming-cardimg" alt = {event.id} src = {`https://drive.google.com/thumbnail?id=${event.id}`}/>
                            <div className="overlay">
                                {event.timestamp}
                            </div>
                        </div>
                        <div className="upcoming-info">
                            <div className="upcoming-title">
                                {event.eventName}
                            </div>
                            <div className="info-bottom">
                                <div className="upcoming-location center-content-left">
                                    <img className = "upcoming-pin" src = {pin}/>
                                    {event.cityName}
                                </div>
                                <div>
                                    {event.weather}|{event.distanceKm}Km
                                </div>
                            </div>
                        </div>
                    </div>                   
                ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}