import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './ComicCard.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const ComicCard = ({ comic }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false)

    const showModal = async (character) => {
        setIsModalVisible(true);

        const characterId = character.resourceURI.split('/').pop();
        console.log("Fetching data for character ID: ", characterId); // Log the character ID
        try {
            const data = await fetchMarvelData('characters', 1, 0, characterId);
            console.log(data); // Log the data
            const characterData = data.results[0];
            console.log(characterData.thumbnail); // Log the thumbnail
            setSelectedCharacter(characterData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
