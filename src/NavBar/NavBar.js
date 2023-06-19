import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <NavLink to="/" end className="navbar-link">Home</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/heroes" className="navbar-link">Heroes</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/comics" className="navbar-link">Comics</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/events" className="navbar-link">Events</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/profile" className="navbar-link">Profile</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/login" className="navbar-link">Login</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/page" className="navbar-link">Page</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
