// NavBar.js
import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './NavBar.module.scss';
import {DarkModeContext} from "../../context/DarkModeContext";

const NavBar = () => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
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
            // Inside click, do nothing
            return;
        }
        // Outside click, close the mobile menu
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        // Listen for clicks outside of the nav menu to close the mobile menu
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
                        <NavLink
                            to="/"
                            className={styles.logoLink}
                            className={styles.activeLogoLink}
                        >
                            <img
                                src={window.location.pathname === '/' ? "/images/Home_Icon.svg" : "/images/Home_Icon_wit.svg"}
                                alt="Comic Collector"
                                className={styles.logoImage}
                            />
                        </NavLink>
                    </div>
                    <div className={styles.navItems}>
                        <div className={styles.leftNav}>
                            {/* Left menu items */}
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
                            {/* Right menu items */}
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
                        <button onClick={toggleDarkMode} className={styles.navButton}>
                            {isDarkMode ? (
                                <img className={styles.darklight} src="/images/light.png" alt="Light Mode" />
                            ) : (
                                <img className={styles.darklight} src="/images/dark.png" alt="Dark Mode" />
                            )}
                        </button>
                    </div>
                    <div className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
                        {/* Mobile menu toggle button */}
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </div>
                    {isMobileMenuOpen && (
                        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
                            {/* Mobile menu items */}
                            {leftPages.map((page) => (
                                <NavLink
                                    key={page}
                                    to={`/${page.toLowerCase()}`}
                                    className={styles.navLink}
                                    className={styles.active}
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
                                        className={styles.active}
                                        onClick={closeMobileMenu}
                                    >
                                        {page}
                                    </NavLink>
                            ))}
                            <button onClick={toggleDarkMode} className={styles.navButton}>
                                {isDarkMode ? (
                                    <img className={styles.darklight} src="/images/light.png" alt="Light Mode" />
                                ) : (
                                    <img className={styles.darklight} src="/images/dark.png" alt="Dark Mode" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
