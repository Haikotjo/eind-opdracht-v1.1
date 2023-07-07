import React, {useState} from 'react';
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './HeroCard.module.scss';
import {Card, Collapse, Space} from "antd";

const { Panel } = Collapse;

const HeroCard = ({ hero }) => {

    const [isExpanded, setIsExpanded] = useState(false)
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
                            <ul className={styles["hero-info__comic-list"]}>
                                <h4>Comics</h4>
                                {hero.comics.items.map((comic, index) => (
                                    <li key={index} className={styles["hero-info__comic-list-item"]}>
                                        <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                                            {comic.name}
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
                    className={styles["hero-card__image"]}
                    alt={hero.name}
                    src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                />
                <SaveButton itemKey="savedHero" item={hero} />
            </Card>
        </Space>
    );
}

export default HeroCard;
