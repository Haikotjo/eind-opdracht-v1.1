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
                        <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', marginTop: '0.75em' }}>
                            {hero.name}
                        </h2>
                        <p style={{ marginTop: '0.5em', color: '#ffffff' }}>{hero.description}</p>
                        {/*Ik weet dat het Hardcoden van de css niet hoort maar ik kreeg het echt niet voor elkaar*/}
                        <ul className={styles['hero-card__info-comic-list']}>
                            Comics:
                            {/* Render the list of comics */}
                            {hero.comics.items.map((comic, index) => (
                                <li key={index} className={styles['hero-card__info-comic-list-item']}>
                                    {/* Handle comic selection */}
                                    <a onClick={() => onSelectComic(comic)}>
                                        {comic.name}
                                    </a>
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
