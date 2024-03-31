import "../stylesheets/mainpage.css";
import Recommended from "./recommended.js";
import Upcoming from "./upcoming.js";

export default function MainPage(){
    return(
        <div className="banner-container">
            <div className="heading">
                Discover Exciting Events Happening <br/>Near You - Stay Tuned for Updates!
            </div>
            <div className="white text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore etdolore magna aliqua.
                <br/>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit 
            </div>
            <Recommended/>
            <Upcoming/>
        </div>
    )
}