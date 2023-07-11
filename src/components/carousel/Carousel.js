import React, { useRef } from 'react';
import styles from './Carousel.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const Carousel = ({ items, CardComponent, mapItemToProps, ...props }) => {
    const carouselRef = useRef();

    const handleScroll = (direction) => {
        const distance = 800;

        if (direction === 'left') {
            carouselRef.current.scrollLeft -= distance;
        } else if (direction === 'right') {
            carouselRef.current.scrollLeft += distance;
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <StandardButton onClick={() => handleScroll('left')}>&larr;</StandardButton>
            <div className={styles.carousel} ref={carouselRef}>
                {items.map((item) => {
                    const cardProps = mapItemToProps ? mapItemToProps(item) : { item };
                    return <CardComponent key={item.id} {...cardProps} {...props} />;
                })}
            </div>
            <StandardButton onClick={() => handleScroll('right')}>&rarr;</StandardButton>
        </div>
    );
};

export default Carousel;
