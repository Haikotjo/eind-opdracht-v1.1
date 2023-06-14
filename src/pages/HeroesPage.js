import React, { useState, useEffect } from 'react';
import { getHeroes } from '../api';
import HeroCard from '../components/hero-card/HeroCard';

function HeroesPage() {
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getHeroes(20, offset)
            .then(response => {
                console.log(response.data);
                setHeroes(response.data.data.results);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    }, [offset]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function goToNextPage() {
        setOffset(offset + 20);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - 20));
    }

    return (
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            <input className="heroes-search" type="text" placeholder="Search for a hero..." />
            <div className="heroes-list">
                {heroes.map(hero => <HeroCard key={hero.id} hero={hero} />)}
            </div>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>

        </div>
    );
}

export default HeroesPage;
