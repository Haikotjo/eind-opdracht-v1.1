// Loading.js
import React from 'react';
import styles from './Loading.module.scss';

function Loading() {
    return (
        <section className={styles["loading-container"]}>
            <div className={styles["image-container"]}>
                <img className={styles["loading-image"]} src="/images/white 1.png" alt="loading screen"/>
                <h1 className={styles["loading-message"]}>
                    loading...
                </h1>
            </div>
        </section>
    );
}

export default Loading;
