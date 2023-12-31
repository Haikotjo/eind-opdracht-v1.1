import React, { useRef } from 'react';
import styles from './Carousel.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const Carousel = ({ items, CardComponent, mapItemToProps, ...props }) => {
    const carouselRef = useRef();

    // Function to handle scrolling of the carousel
    const handleScroll = (direction) => {
        const distance = 275;

        if (direction === 'left') {
            carouselRef.current.scrollLeft -= distance;
        } else if (direction === 'right') {
            carouselRef.current.scrollLeft += distance;
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <StandardButton className={styles['scroll-button']} onClick={() => handleScroll('left')}>
                <img className={styles['left']} src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
            </StandardButton>
            <div className={styles.carousel} ref={carouselRef}>
                {items.map((item) => {
                    // Map each item to props for the CardComponent
                    const cardProps = mapItemToProps ? mapItemToProps(item) : { item };
                    return (
                        <div className={styles.carouselItem} key={item.id}>
                            <CardComponent {...cardProps} {...props} />
                        </div>
                    );
                })}
            </div>
            <StandardButton className={styles['scroll-button']} onClick={() => handleScroll('right')}>
                <img className={styles['right']} src='/images/up-arrow-svgrepo-com.svg' alt="Top" />
            </StandardButton>
        </div>
    );
};

export default Carousel;
