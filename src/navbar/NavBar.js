import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './NavBar.module.scss';

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext)

    return (
        <nav className={styles.navbar}>
            <ul className={styles['navbar-list-left']}>
                <li className={styles['navbar-item']}><NavLink to="/" end className={styles['navbar-link']}>Home</NavLink></li>
                <li className={styles['navbar-item']}><NavLink to="/heroes" className={styles['navbar-link']}>Heroes</NavLink></li>
                <li className={styles['navbar-item']}><NavLink to="/comics" className={styles['navbar-link']}>Comics</NavLink></li>
                <li className={styles['navbar-item']}><NavLink to="/events" className={styles['navbar-link']}>Events</NavLink></li>
                {isAuth && <li className={styles['navbar-item']}><NavLink to="/profile" className={styles['navbar-link']}>Profile</NavLink></li>}
            </ul>
            <ul className={styles['navbar-list-right']}>
                {isAuth &&
                    <li className={styles['navbar-item']}><button type="button" className={styles['navbar-link']} onClick={logout}>Logout</button></li>
                }
                {!isAuth &&
                    <>
                        <li className={styles['navbar-item']}><Link to="/login" className={styles['navbar-link']}>Login</Link></li>
                        <li className={styles['navbar-item']}><Link to="/register" className={styles['navbar-link']}>Register</Link></li>
                    </>
                }
            </ul>
        </nav>
    );
}

export default NavBar;
