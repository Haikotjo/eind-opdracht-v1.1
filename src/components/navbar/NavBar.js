// NavBar.js
import React, {useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavBar.module.scss';

const NavBar = () => {
    const { isAuth, logout } = useContext(AuthContext);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const leftPages = ['Events', 'Comics', 'Heroes'];
    const rightPages = isAuth ? ['Profile', 'Logout'] : ['Login', 'Register'];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
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
                                    className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
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
                                        className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink}
                                    >
                                        {page}
                                    </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                {isMobileMenuOpen && (
                    <div className={styles.mobileMenu}>
                        {leftPages.map((page) => (
                            <NavLink
                                key={page}
                                to={`/${page.toLowerCase()}`}
                                className={styles.navLink}
                                activeClassName={styles.active}
                            >
                                {page}
                            </NavLink>
                        ))}
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
                                    activeClassName={styles.active}
                                >
                                    {page}
                                </NavLink>

                        ))}
                    </div>
                )}
            </nav>
        </>
    );
};

export default NavBar;
