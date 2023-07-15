import React, {useState} from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './EventCard.module.scss';
import StandardButton from "../buttons/standardButton/StandardButton";

const EventCard = ({ event, onComicClick, onCharacterClick }) => {

    const [isExpanded, setIsExpanded] = useState(false)

    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.content}>
                <img
                    className={styles['event-card__image']}
                    alt={event.title}
                    src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackAfbeeldingURL'}
                />
                <div className={styles.buttonContainer}>
                    <SaveButton itemKey="savedEvent" item={event} />
                    <StandardButton className={styles['more-info']} onClick={handlePanelChange}>
                        {isExpanded ? "Less" : "More"}
                    </StandardButton>
                </div>
                {isExpanded && (
                    <>
                        <h2 className={styles['event-card__info-name']}>{event ? event.title : ''}</h2>
                        <p className={styles['event-card__info-description']}>{event.description}</p>
                        <ul className={styles['event-card__info-hero-list']}>
                            <h2>Heroes</h2>
                            {event.characters.items.map((character, index) => (
                                <li key={index} className={styles['event-card__info-comic-list-item']}>
                                    <a onClick={() => onCharacterClick(character)}>
                                        {character.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul className={styles['event-card__info-comic-list']}>
                            <h2>comics</h2>
                            {event.comics.items.map((comic, index) => (
                                <li key={index} className={styles['event-card__info-hero-list-item']}>
                                    <a onClick={() => onComicClick(comic)}>
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

export default EventCard;
