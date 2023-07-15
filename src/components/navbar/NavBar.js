// NavBar.js
import React, {useContext, useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavBar.module.scss';

const NavBar = () => {
    const { isAuth, logout } = useContext(AuthContext);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const node = useRef();

    const leftPages = ['Events', 'Comics', 'Heroes'];
    const rightPages = isAuth ? ['Profile', 'Logout'] : ['Login', 'Register'];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        // Listen for clicks outside of the nav menu
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className={styles.navBar} ref={node}>
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
                                    onClick={closeMobileMenu}
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
                                        onClick={closeMobileMenu}
                                    >
                                        {page}
                                    </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </div>
                    {isMobileMenuOpen && (
                        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
                            {leftPages.map((page) => (
                                <NavLink
                                    key={page}
                                    to={`/${page.toLowerCase()}`}
                                    className={styles.navLink}
                                    activeClassName={styles.active}
                                    onClick={closeMobileMenu}
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
                                        onClick={closeMobileMenu}
                                    >
                                        {page}
                                    </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
