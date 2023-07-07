import React, {useState} from 'react';
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './ComicCard.module.scss';
import { Card, Space, Collapse } from 'antd';

const { Panel } = Collapse;

const ComicCard = ({ comic }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const handlePanelChange = (key) => {
        setIsExpanded(!!key.length);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card
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
                                        <Link to={`/heroes/${character.resourceURI.split('/').pop()}`}>
                                            {character.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Panel>
                    </Collapse>
                }
                style={{
                    width: 300,
                }}
            >
                <img
                    className={styles["comic-card__image"]}
                    src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                    alt={comic.title}
                />
                <SaveButton itemKey="savedComic" item={comic} />
            </Card>
        </Space>
    );
}

export default ComicCard;

