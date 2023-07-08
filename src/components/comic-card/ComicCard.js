import React, { useContext, useState } from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from './ComicCard.module.scss';
import { Card, Space, Collapse, Button } from 'antd';
import { DataContext } from '../../context/DataContext';
import CustomModal from '../customModal/CustomModal';

const { Panel } = Collapse;

const ComicCard = ({ comic }) => {
    const { fetchMarvelData } = useContext(DataContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

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

    const [isExpanded, setIsExpanded] = useState(false)
    const handlePanelChange = (key) => {
        setIsExpanded(!!key.length);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card
                size="small"
                title={comic.title}
                extra={
                    <Collapse ghost onChange={handlePanelChange}>
                        <Panel header={isExpanded ? "Less" : "More"} key="1">
                            <SaveButton itemKey="savedComic" item={comic} />
                            <h2 className={styles["comic-card__info-title"]}>{comic.title}</h2>
                            <p className={styles["comic-card__info-description"]}>{comic.description}</p>
                            <ul className={styles["comic-card__info-hero-list"]}>
                                {comic.characters.items.map((character, index) => (
                                    <li key={index} className={styles["comic-card__info-hero-list-item"]}>
                                        <a onClick={() => showModal(character)}>
                                            {character.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Panel>
                    </Collapse>
                }
                style={{
                    width: 250,
                }}
            >
                <img
                    className={styles["comic-card__image"]}
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                />
                <SaveButton itemKey="savedComic" item={comic} />
            </Card>
            <CustomModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedCharacter}
                itemKey="savedHero"
                title="Character Details"
            >
            </CustomModal>
        </Space>
    );
};

export default ComicCard;
