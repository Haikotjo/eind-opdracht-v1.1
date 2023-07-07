import React, {useState} from 'react';
import SaveButton from "../buttons/addToFavorite/AddToFavorite";
import {Link} from "react-router-dom";
import styles from './EventCard.module.scss';
import {Card, Collapse, Space} from "antd";

const { Panel } = Collapse;

const EventCard = ({ event }) => {

    const [isExpanded, setIsExpanded] = useState(false)
    const handlePanelChange = (key) => {
        setIsExpanded(!!key.length);
    };

    return (
        <Space direction="vertical" size={16}>
            <Card
                title={event.title}
                extra={
                    <Collapse ghost onChange={handlePanelChange}>
                        <Panel header={isExpanded ? "Less" : "More"} key="1">
                            <SaveButton itemKey="savedEvent" item={event} />
                            <h2 className={styles['event-card__info--title']}>{event ? event.title : ''}</h2>
                            <p className={styles['event-card__info--description']}>{event.description}</p>
                            <ul className={styles['event-card__info--hero-list']}> Heroes:
                                {event.characters.items.map((character, index) => (
                                    <li key={index} className={styles['event-card__info--hero-list-item']}>
                                        <Link to={`/heroes/${character.resourceURI.split('/').pop()}`}>
                                            {character.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className={styles['event-card__info--comic-list']}> Comics:
                                {event.comics.items.map((comic, index) => (
                                    <li key={index} className={styles['event-card__info--comic-list-item']}>
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
                    className={styles['event-card__image']}
                    alt={event.title}
                    src={event && event.thumbnail ? `${event.thumbnail.path}/portrait_incredible.${event.thumbnail.extension}` : 'fallbackAfbeeldingURL'}
                />
                <SaveButton itemKey="savedEvent" item={event} />
            </Card>
        </Space>
    );
}
    export default EventCard;
