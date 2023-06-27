import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

function NavBar() {

    const {isAuth, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><NavLink to="/" end className="navbar-link">Home</NavLink></li>
                <li className="navbar-item"><NavLink to="/heroes" className="navbar-link">Heroes</NavLink></li>
                <li className="navbar-item"><NavLink to="/comics" className="navbar-link">Comics</NavLink></li>
                <li className="navbar-item"><NavLink to="/events" className="navbar-link">Events</NavLink></li>
                <li className="navbar-item">{ isAuth && <NavLink to="/profile" className="navbar-link">Profile</NavLink> }</li>
                {/*<li className="navbar-item"><NavLink to="/page" className="navbar-link">Page</NavLink></li>*/}
                {isAuth &&
                <>
                <li><button type="button" onClick={logout}>Logout</button></li>
                </>
                }
                {!isAuth &&
                <>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                </>
                }
            </ul>
        </nav>
    );
}

export default NavBar;
