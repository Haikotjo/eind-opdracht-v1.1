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
        <div className={styles.card}>
            <div className={styles.title}>{hero.name}</div>
            <div className={styles.content}>
                <img
                    className={styles['hero-card__image']}
                    alt={hero.name}
                    src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                />
                <div className={styles.buttonContainer}>
                    <SaveButton itemKey="savedHero" item={hero} />
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        <h2 className={styles['hero-card__info-name']}>{hero.name}</h2>
                        <p className={styles['hero-card__info-description']}>{hero.description}</p>
                        <ul className={styles['hero-card__info-comic-list']}>
                            {hero.comics.items.map((comic, index) => (
                                <li key={index} className={styles['hero-card__info-comic-list-item']}>
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
