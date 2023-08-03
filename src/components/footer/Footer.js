import React from 'react';
import styles from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-left"]}>
                Made possible by Hogeschool Novi, with thanks to teacher Elwyn de Neve and SME'er Sam Barnhoorn. Thanks guys!
            </div>
            <div className={styles["footer-right"]}>
                © 2023 Haiko Wierda
            </div>
        </footer>
    );
}

export default Footer;
