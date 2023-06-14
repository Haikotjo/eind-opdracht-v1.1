import React from 'react';
import {Link} from "react-router-dom";

const HeroCard = ({ hero }) => {
    return (
        <div className="hero-card">
            <img
                className="hero-card-image"
                src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                alt={hero.name}
            />
            <div className="hero-info">
                <h2 className="hero-info-name">{hero.name}</h2>
                <p className="hero-info-description">{hero.description}</p>
                <ul className="hero-info-comic-list">
                    {hero.comics.items.map((comic, index) => (
                        <li key={index}>
                            <Link to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                                {comic.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HeroCard;
