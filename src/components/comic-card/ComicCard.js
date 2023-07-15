// ComicCard.js
import React, { useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './ComicCard.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const ComicCard = ({ comic, onSelectCharacter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.title}>{comic.title}</div>
            <div className={styles.content}>
                <img
                    className={styles['comic-card__image']}
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                />
                <div className={styles.buttonContainer}>
                    <SaveButton itemKey="savedComic" item={comic} />
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        <h2 className={styles['comic-card__info-title']}>{comic.title}</h2>
                        <p className={styles['comic-card__info-description']}>{comic.description}</p>
                        <ul className={styles['comic-card__info-hero-list']}>
                            {comic.characters.items.map((character, index) => (
                                <li key={index} className={styles['comic-card__info-hero-list-item']}>
                                    <a onClick={() => onSelectCharacter(character)}>
                                        {character.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default ComicCard;
