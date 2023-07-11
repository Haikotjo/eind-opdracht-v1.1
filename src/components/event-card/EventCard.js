import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './EventCard.module.scss';
import { DataContext } from '../../context/DataContext';
import { handleError } from "../../helpers/handleError";
import CustomModal from '../customModal/CustomModal';

const EventCard = ({ event }) => {
    // Haal de fetchMarvelData functie uit de DataContext
    const { fetchMarvelData } = useContext(DataContext);

    // State voor modal zichtbaarheid, geselecteerde comic/character, en error
    const [isComicModalVisible, setIsComicModalVisible] = useState(false);
    const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);
    const [selectedComic, setSelectedComic] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [error, setError] = useState(null);

    // Functie om de modal te openen en de data voor het geselecteerde item op te halen
    const showModal = async (item, type) => {
        const itemId = item.resourceURI.split('/').pop();
        console.log("Fetching data for item ID: ", itemId); // Log het item ID
        try {
            const data = await fetchMarvelData(type, 1, 0, itemId);
            console.log(data); // Log de data
            const itemData = data.results[0];
            console.log(itemData.thumbnail); // Log de thumbnail
            if (type === 'comics') {
                setSelectedComic(itemData);
                setIsComicModalVisible(true); // Open de comic modal
            } else if (type === 'characters') {
                setSelectedCharacter(itemData);
                setIsCharacterModalVisible(true); // Open de character modal
            }
        } catch (err) {
            handleError(err); // Handle de error met de helper functie
            setError(err);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
        }
    };

    // Handlers voor modal knoppen
    const handleComicModalOk = () => {
        setIsComicModalVisible(false);
    };

    const handleComicModalCancel = () => {
        setIsComicModalVisible(false);
    };

    const handleCharacterModalOk = () => {
        setIsCharacterModalVisible(false);
    };

    const handleCharacterModalCancel = () => {
        setIsCharacterModalVisible(false);
    };

    // Handler voor het uitklappen van meer informatie
    const [isExpanded, setIsExpanded] = useState(false)
    const handlePanelChange = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        error ? (
                <div className={styles["error"]}>
                    <h2 className={styles["error-title"]}>Er is iets misgegaan...</h2>
                    <p className={styles["error-message"]}>We konden de gevraagde data niet laden. Probeer het later opnieuw.</p>
                    <p className={styles["error-details"]}>Foutdetails: {error.message}</p>
                </div>
            ) :
            <div className={styles.card}>
            <div className={styles.title}>{event.title}</div>
            <div className={styles.content}>
                <img
                    className={styles['event-card__image']}
                    alt={event.title}
                    src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackAfbeeldingURL'}
                />
                <SaveButton itemKey="savedEvent" item={event} />

                <div className={styles['more-info']} onClick={handlePanelChange}>
                    {isExpanded ? "Less" : "More"}
                </div>

                {isExpanded && (
                    <>
                        <h2 className={styles['event-card__info-name']}>{event ? event.title : ''}</h2>
                        <p className={styles['event-card__info-description']}>{event.description}</p>
                        <ul className={styles['event-card__info-hero-list']}>
                            <h2>Heroes</h2>
                            {event.characters.items.map((character, index) => (
                                <li key={index} className={styles['event-card__info-comic-list-item']}>
                                    <a onClick={() => showModal(character, 'characters')}>
                                        {character.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul className={styles['event-card__info-comic-list']}>
                            <h2>comics</h2>
                            {event.comics.items.map((comic, index) => (
                                <li key={index}className={styles['event-card__info-hero-list-item']}>
                                    <a onClick={() => showModal(comic, 'comics')}>
                                        {comic.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <CustomModal
                isModalVisible={isComicModalVisible}
                handleOk={handleComicModalOk}
                handleCancel={handleComicModalCancel}
                selectedItem={selectedComic}
                itemKey="savedComic"
                title="Comic Details"
            />
            <CustomModal
                isModalVisible={isCharacterModalVisible}
                handleOk={handleCharacterModalOk}
                handleCancel={handleCharacterModalCancel}
                selectedItem={selectedCharacter}
                itemKey="savedHero"
                title="Hero Details"
            />
        </div>
    );
}

export default EventCard;
