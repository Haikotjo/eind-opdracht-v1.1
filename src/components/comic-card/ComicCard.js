import React, { useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './ComicCard.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const ComicCard = ({ comic, onSelectCharacter }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to handle panel change (expand/collapse)
    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles['card']}>
            {/* Display the comic title */}
            <div className={styles['title']}>{comic.title}</div>
            <div className={styles['content']}>
                {/* Display the comic image */}
                <img
                    className={styles['comic-card__image']}
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                />
                <div className={styles['buttonContainer']}>
                    {/* Render the save button */}
                    <SaveButton itemKey="savedComic" item={comic} />
                    {/* Render the standard button */}
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {/* Toggle the button label based on expanded state */}
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        {/* Display additional comic information */}
                        <h2 className={styles['comic-card__info-title']}>{comic.title}</h2>
                        <p className={styles['comic-card__info-description']}>{comic.description}</p>
                        <ul className={styles['comic-card__info-hero-list']}>
                            Heroes:
                            {/* Render the list of characters */}
                            {comic.characters.items.map((character, index) => (
                                <li key={index} className={styles['comic-card__info-hero-list-item']}>
                                    {/* Handle character click */}
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
