import React from "react";
import './NavBar.css'

const NavLinks = ({route,changRoute}) => {
    switch (route) {
        case 'home':
        case 'leaderboard':
            //case 'profile':
            return (
                <div className="navBar navContainer">
                    <p className="navBar navLink" onClick={() => {changRoute('home')}} >Home</p>
                    <p className="navBar navLink" onClick={() => {changRoute('leaderboard')}} >LeaderBoard</p>
                    <p className="navBar navLink" onClick={() => {changRoute('signout')}} >SignOut</p>
                </div>
            );
        case 'signin':
        case 'register':
            return (
                <div className="navBar navContainer">
                    <p className="navBar navLink" onClick={() => {changRoute('signin') }} >SignIn</p>
                    <p className="navBar navLink" onClick={() => { changRoute('register')}} >Register</p>
                </div>
            );
            case 'about':
                return (
                    <div className="navBar navContainer">
                        <p className="navBar navLink" onClick={() => {window.location.reload(false)}} >Back</p>
                    </div>
                );
        default:
            break;
    }

}

 const NavBar = ({ Route ,changeRoute}) => {
    return (
        <div className="navBar main">
            <div className="navBar header">Smart Brain</div>
            <div className="navBar main2">
                <NavLinks changRoute={changeRoute} route={Route} />
            </div>
        </div>
    );
}

export default NavBar;