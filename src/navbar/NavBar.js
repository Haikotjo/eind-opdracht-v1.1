import {Link, NavLink} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import './NavBar.module.css';

function NavBar() {

    const {isAuth, logout} = useContext(AuthContext)
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><NavLink to="/" end className="navbar-link">Home</NavLink></li>
                <li className="navbar-item"><NavLink to="/heroes" className="navbar-link">Heroes</NavLink></li>
                <li className="navbar-item"><NavLink to="/comics" className="navbar-link">Comics</NavLink></li>
                <li className="navbar-item"><NavLink to="/events" className="navbar-link">Events</NavLink></li>
                <li className="navbar-item">{ isAuth && <NavLink to="/profile" className="navbar-link">Profile</NavLink> }</li>
            </ul>
            <ul className="navbar-list">
                {isAuth &&
                    <>
                        <li><button type="button" onClick={logout}>Logout</button></li>
                    </>
                }
                {!isAuth &&
                    <>
                        <li className="navbar-item"><Link to="/login" >Login</Link></li>
                        <li className="navbar-item"><Link to="/register">Register</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default NavBar;
