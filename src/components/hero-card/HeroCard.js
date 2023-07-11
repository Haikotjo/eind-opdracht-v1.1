import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import { handleError } from "../../helpers/handleError";
import styles from './HeroCard.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const HeroCard = ({ hero }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedComic, setSelectedComic] = useState(null);
    const [error, setError] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false)

    // Functie om de modal te openen en de comic data op te halen
    const showModal = async (comic) => {
        setIsModalVisible(true);

        const comicId = comic.resourceURI.split('/').pop();
        console.log("Fetching data for comic ID: ", comicId); // Log het comic ID
        try {
            const data = await fetchMarvelData('comics', 1, 0, comicId);
            const comicData = data.results[0];
            setSelectedComic(comicData);
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
            <div className={styles.title}>{hero.name}</div>
            <div className={styles.content}>
                <img
                    className={styles['hero-card__image']}
                    alt={hero.name}
                    src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                />
                <SaveButton itemKey="savedHero" item={hero} />

                <div className={styles['more-info']} onClick={handlePanelChange}>
                    {isExpanded ? "Less" : "More"}
                </div>

                {isExpanded && (
                    <>
                        <h2 className={styles['hero-card__info-name']}> {hero.name}</h2>
                        <p className={styles['hero-card__info-description']}>{hero.description}</p>
                        <ul className={styles['hero-card__info-comic-list']}>
                            {hero.comics.items.map((comic, index) => (
                                <li key={index} className={styles['hero-card__info-comic-list-item']}>
                                    <a onClick={() => showModal(comic)}>
                                        {comic.name}
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
                selectedItem={selectedComic}
                itemKey="savedHero"
                title="Comic Details"
            />
        </div>
    );
}

export default HeroCard;
