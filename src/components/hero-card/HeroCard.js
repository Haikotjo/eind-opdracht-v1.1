import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './HeroCard.module.scss';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const HeroCard = ({ hero }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedComic, setSelectedComic] = useState(null);

    const [isExpanded, setIsExpanded] = useState(false)

    const showModal = async (comic) => {
        setIsModalVisible(true);

        const comicId = comic.resourceURI.split('/').pop();
        console.log("Fetching data for comic ID: ", comicId);
        try {
            const data = await fetchMarvelData('comics', 1, 0, comicId);
            console.log(data); // Log the data
            const comicData = data.results[0];
            console.log(comicData.thumbnail); // Log the thumbnail
            setSelectedComic(comicData);
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
                        <h2 className={styles['hero-info__name']}>{hero.name}</h2>
                        <p className={styles['hero-info__description']}>{hero.description}</p>
                        <ul>
                            {hero.comics.items.map((comic, index) => (
                                <li key={index}>
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
