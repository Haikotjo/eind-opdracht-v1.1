import React, { useState, useEffect } from 'react';
import { fetchMarvelAPI } from '../api';
import HeroCard from '../components/hero-card/HeroCard';
import Modal from "react-modal";
import {DataContext} from "../context/DataContext";

function HeroesPage() {
    const [heroes, setHeroes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentHero, setCurrentHero] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalSearch, setTotalSearch] = useState(null);

    // const [total, setTotal] = useState(null);

    useEffect(() => {
        fetchMarvelAPI('characters', 20, offset, null, searchTerm)
            .then(response => {
                console.log(response)
                console.log(response.length)
                setHeroes(response);
                setIsLoading(false);
                setTotalSearch(response.length)
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    }, [offset, searchTerm]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function goToNextPage() {
        setOffset(offset + 20);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - 20));
    }

    const handleHeroClick = (hero) => {
        setCurrentHero(hero);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        fetchMarvelAPI('characters', 20, 0, null, event.target.value)
            .then(response => {
                console.log(response.data);
                setHeroes(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de helden: ", error);
                setIsLoading(false);
            });
    };


    const filteredHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={totalSearch <= 19}>Volgende</button>
            <input
                className="heroes-search"
                type="text"
                placeholder="Search for a hero..."
                value={searchTerm}
                onChange={handleSearchChange} // Use the handleSearchChange function when the input changes
            />
            {totalSearch < 20 && (
                <p>{totalSearch} resultaten</p>
            )}
            <div className="heroes-list" >
                {filteredHeroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}
            </div>
            {/*<div className="heroes-list" >*/}
            {/*    {heroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}*/}
            {/*</div>*/}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={totalSearch <= 19}>Volgende</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Hero Details Modal"
            >
                {currentHero && <HeroCard hero={currentHero} isModal={true} />}
            </Modal>
        </div>
    );
}

export default HeroesPage;
