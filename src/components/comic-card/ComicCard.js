import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import { handleError } from "../../helpers/handleError";
import styles from './ComicCard.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const ComicCard = ({ comic }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [error, setError] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false)

    // Functie om de modal te openen en de character data op te halen
    const showModal = async (character) => {
        setIsModalVisible(true);

        const characterId = character.resourceURI.split('/').pop();
        console.log("Fetching data for character ID: ", characterId); // Log het character ID
        try {
            const data = await fetchMarvelData('characters', 1, 0, characterId);
            const characterData = data.results[0];
            setSelectedCharacter(characterData);
        } catch (error) {
            handleError(error); // Handle de error met de helper functie
            setError(error);    // Zet de error state zodat deze kan worden weergegeven aan de gebruiker
        }
    };

    // Handlers voor het sluiten van de modal
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handler voor het uitklappen van meer informatie
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
            <div className={styles.title}>{comic.title}</div>
            <div className={styles.content}>
                <img
                    className={styles['comic-card__image']}
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                />
                <SaveButton itemKey="savedComic" item={comic} />

                <div className={styles['more-info']} onClick={handlePanelChange}>
                    {isExpanded ? "Less" : "More"}
                </div>

                {isExpanded && (
                    <>
                        <h2 className={styles['comic-card__info-title']}>{comic.title}</h2>
                        <p className={styles['comic-card__info-description']}>{comic.description}</p>
                        <ul className={styles['comic-card__info-hero-list']}>
                            {comic.characters.items.map((character, index) => (
                                <li key={index} className={styles['comic-card__info-hero-list-item']}>
                                    <a onClick={() => showModal(character)}>
                                        {character.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            <CustomModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedCharacter}
                itemKey="savedHero"
                title="Character Details"
            />
        </div>
    );
};

export default ComicCard;
