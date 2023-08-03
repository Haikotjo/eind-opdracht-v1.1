import React from 'react';
import styles from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-left"]}>
                With special thanks to Elwyn de Neve, Sam Barnhoorn and Hogeschool Novi.
            </div>
            <div className={styles["footer-right"]}>
                © 2023 Haiko Wierda
            </div>
        </footer>
    );
}

export default Footer;
