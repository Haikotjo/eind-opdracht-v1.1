import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../components/hero-card/HeroCard';
import Modal from "react-modal";
import {DataContext} from "../context/DataContext";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";
import {handleError} from "../helpers/handleError";
import {filterData} from "../helpers/filterData";

function HeroesPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");

    const [heroes, setHeroes] = useState(null);
    const [currentHero, setCurrentHero] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);

    const pageSize = 20
    const currentPage = offset / 20 + 1;

    useEffect(() => {
        fetchMarvelData('characters', pageSize, offset, null, null, searchTerm, false)
            .then(data => {
                console.log(data.results)
                setTotal(data.total)
                if(Array.isArray(data.results)){
                    setHeroes(data.results);
                    const validHeroes = data.results.filter(heroes => {
                        return !heroes.thumbnail.path.endsWith('image_not_available');
                    });
                    setHeroes(validHeroes);
                }else {
                    console.error('Unexpected response:', data.results)
                    setHeroes([]);
                    console.log('Total after setTotal:', total);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                handleError(error, setError);
            });
    }, [offset, searchTerm, fetchMarvelData, total]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function goToNextPage() {
        setOffset(offset + pageSize);
    }

    function goToPreviousPage() {
        setOffset(Math.max(0, offset - pageSize));
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
        fetchMarvelData('characters', pageSize, 0, null, event.target.value, null, false)
            .then(data => {
                console.log(data.total);
                setHeroes(data.results);
                setTotal(data.total);
                setIsLoading(false);
                console.log('Total after setTotal:', total);
            })
            .catch((error) => {
                console.error("Er was een fout bij het ophalen van de held(en): ", error);
                handleError(error, setError);
                setIsLoading(false);
            });
    };

    const filteredHeroes = filterData(heroes, searchTerm, 'name');

    return (
        isLoading ? (
                <div>Loading...</div>
            ) :
        <div className="heroes-page">
            <h1 className="heroes-title">Heroes</h1>
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="heroes-search"
                type="text"
                placeholder="Search for a hero..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>Page {currentPage} of {Math.ceil(total / 20)} met een totaal van {total} resultaten</div>
            <div className="heroes-list" >
                {filteredHeroes.map(hero => <HeroCard key={hero.id} hero={hero} onCardClick={handleHeroClick}/>)}
            </div>
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Hero Details Modal"
            >
                {currentHero && <HeroCard hero={currentHero} isModal={true} />}
            </Modal>
            {
                error && (
                    <div>Error: {error}</div>
                )
            }
        </div>
    );
}

export default HeroesPage;
