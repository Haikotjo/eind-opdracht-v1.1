import React, { useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './EventCard.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const EventCard = ({ event, onComicClick, onCharacterClick }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    // Function to handle panel change (expand/collapse)
    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.card}>
            {/* Display the event title */}
            <div className={styles.title}>{event.title}</div>
            <div className={styles.content}>
                {/* Display the event image */}
                <img
                    className={styles['event-card__image']}
                    alt={event.title}
                    src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackImageURL'}
                />
                <div className={styles.buttonContainer}>
                    {/* Render the save button */}
                    <SaveButton itemKey="savedEvent" item={event} />
                    {/* Render the standard button */}
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {/* Toggle the button label based on expanded state */}
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        {/* Display additional event information */}
                        <h2 className={styles['event-card__info-name']}>{event ? event.title : ''}</h2>
                        <p className={styles['event-card__info-description']}>{event.description}</p>
                        <ul className={styles['event-card__info-hero-list']}>
                            <h2>Heroes</h2>
                            {/* Render the list of characters */}
                            {event.characters.items.map((character, index) => (
                                <li key={index} className={styles['event-card__info-comic-list-item']}>
                                    {/* Handle character click */}
                                    <button onClick={() => onCharacterClick(character)}>
                                        {character.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <ul className={styles['event-card__info-comic-list']}>
                            <h2>Comics</h2>
                            {/* Render the list of comics */}
                            {event.comics.items.map((comic, index) => (
                                <li key={index} className={styles['event-card__info-hero-list-item']}>
                                    {/* Handle comic click */}
                                    <button onClick={() => onComicClick(comic)}>
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

export default EventCard;
