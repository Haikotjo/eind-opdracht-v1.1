import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './EventCard.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const EventCard = ({ event }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isComicModalVisible, setIsComicModalVisible] = useState(false);
    const [isCharacterModalVisible, setIsCharacterModalVisible] = useState(false);

    const [selectedComic, setSelectedComic] = useState(null);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const showModal = async (item, type) => {
        const itemId = item.resourceURI.split('/').pop();
        console.log("Fetching data for item ID: ", itemId); // Log the item ID
        try {
            const data = await fetchMarvelData(type, 1, 0, itemId);
            console.log(data); // Log the data
            const itemData = data.results[0];
            console.log(itemData.thumbnail); // Log the thumbnail
            if (type === 'comics') {
                setSelectedComic(itemData);
                setIsComicModalVisible(true); // Open the comic modal
            } else if (type === 'characters') {
                setSelectedCharacter(itemData);
                setIsCharacterModalVisible(true); // Open the character modal
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                <SaveButton itemKey="savedEvent" item={event} />

                <div className={styles['more-info']} onClick={handlePanelChange}>
                    {isExpanded ? "Less" : "More"}
                </div>

                {isExpanded && (
                    <>
                        <h2 className={styles['event-card__info--title']}>{event ? event.title : ''}</h2>
                        <p className={styles['event-card__info--description']}>{event.description}</p>
                        <ul>
                            <p>heroes</p>
                            {event.characters.items.map((character, index) => (
                                <li key={index}>
                                    <a onClick={() => showModal(character, 'characters')}>
                                        {character.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            <p>comics</p>
                            {event.comics.items.map((comic, index) => (
                                <li key={index}>
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
