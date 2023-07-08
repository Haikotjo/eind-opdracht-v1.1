import React, {useContext, useState} from 'react';
import { DataContext } from '../../context/DataContext';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import {Link} from "react-router-dom";
import styles from './HeroCard.module.scss';
import {Card, Collapse, Space, Button} from "antd";
import CustomModal from '../customModal/CustomModal';

const { Panel } = Collapse;

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

    const handlePanelChange = (key) => {
        setIsExpanded(!!key.length);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card
                title={hero.name}
                extra={
                    <Collapse ghost onChange={handlePanelChange}>
                        <Panel header={isExpanded ? "Less" : "More"} key="1">
                            <SaveButton itemKey="savedHero" item={hero} />
                            <h2 className={styles["hero-info__name"]}>{hero.name}</h2>
                            <p className={styles["hero-info__description"]}>{hero.description}</p>
                            <ul>
                                {hero.comics.items.map((comic, index) => (
                                    <li key={index}>
                                        <a onClick={() => showModal(comic)}>
                                            {comic.name}
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
                    className={styles["hero-card__image"]}
                    alt={hero.name}
                    src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                />
                <SaveButton itemKey="savedHero" item={hero} />
            </Card>
            <CustomModal
                isModalVisible={isModalVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                selectedItem={selectedComic}
                itemKey="savedHero"
                title="Comic Details"
            >
            </CustomModal>
        </Space>
    );
}

export default HeroCard;
