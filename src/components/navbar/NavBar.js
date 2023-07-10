// NavBar.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavBar.module.scss';

const NavBar = () => {
    const { isAuth, logout } = useContext(AuthContext);

    const leftPages = ['Events', 'Comics', 'Heroes'];
    const rightPages = isAuth ? ['Profile', 'Logout'] : ['Login', 'Register'];

    return (
        <nav className={styles.navBar}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <a href="/" className={styles.logoLink}>Comic Collector</a>
                </div>
                <div className={styles.navItems}>
                    <div className={styles.leftNav}>
                        {leftPages.map((page) => (
                            <NavLink
                                key={page}
                                to={`/${page.toLowerCase()}`}
                                className={styles.navLink}
                            >
                                {page}
                            </NavLink>
                        ))}
                    </div>
                    <div className={styles.rightNav}>
                        {rightPages.map((page) => (
                            page === "Logout" ?
                                <button
                                    key={page}
                                    onClick={logout}
                                    className={styles.navButton}
                                >
                                    {page}
                                </button> :
                                <NavLink
                                    key={page}
                                    to={`/${page.toLowerCase()}`}
                                    className={styles.navLink}
                                >
                                    {page}
                                </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
