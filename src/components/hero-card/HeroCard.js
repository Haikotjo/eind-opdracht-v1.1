import React, { useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './HeroCard.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const HeroCard = ({ hero, onSelectComic }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles['card']}>
            {/* Display the hero name */}
            <div className={styles['title']}>{hero.name}</div>
            <div className={styles['content']}>
                {/* Display the hero image */}
                <img
                    className={styles['hero-card__image']}
                    src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                    alt={hero.name}
                />
                <div className={styles['buttonContainer']}>
                    {/* Render the save button */}
                    <SaveButton  itemKey="savedHero" item={hero} />
                    {/* Render the standard button */}
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {/* Toggle the button label based on expanded state */}
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        {/* Display additional hero information */}
                        <h2 className={styles['hero-card__info-title']}>
                            {hero.name}
                        </h2>
                        <p className={styles['hero-card__info-description']}>{hero.description}</p>
                        <ul className={styles['hero-card__info-comic-list']}>
                            <h2> Comics:</h2>
                            {/* Render the list of comics */}
                            {hero.comics.items.map((comic, index) => (
                                <li key={index} className={styles['hero-card__info-comic-list-item']}>
                                    {/* Handle comic selection */}
                                    <button
                                        className={styles['hero-card__info-comic-button']}
                                        onClick={() => onSelectComic(comic)}
                                    >
                                        {comic.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default HeroCard;
