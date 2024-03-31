import { useEffect, useState } from "react";
import "../stylesheets/navbar.css"
import heart from "../resources/heart.svg";
import list from "../resources/list.svg";
import search from "../resources/search.svg";
import user from "../resources/user.svg";

function SearchbarDesktop(){
    return(
        <div className="search-container">
            <button className = "btn center-content"><img src = {list}/>Categories</button>
            <input type="text" className="input-box"></input>
        </div>
    )
}

function SearchbarMobile(){
    return(
        <div className="search-container">
            <img src = {search}/>
        </div>
    )
}
function FavDesktop(){
    return(
        <div className="fav center-content color-border">
            <img src = {heart}/>
            Favorites
        </div>
    )
}
function FavMobile(){
    return(
        <div className="fav center-content color-border">
            <img src = {heart}/>
        </div>
    )
}
function UserDesktop(){
    return(
        <button className="user btn-sec">Sign IN</button>
    )
}
function UserMobile(){
    return(
        <div className="user">
            <img src = {user}/>
        </div>
    )
}


export default function Navbar(){
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
            <div className="nav">
                <div className="logo">BookUS</div>
                <div className="center-content">
                    {(width > 900) ? <SearchbarDesktop/>: <SearchbarMobile/>}
                    {(width > 900) ? <FavDesktop/>: <FavMobile/>}
                    {(width > 900) ? <UserDesktop/>: <UserMobile/>}
                </div>
            </div>
        </>
    )
}

