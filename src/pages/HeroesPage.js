import React, { useState, useEffect, useContext } from 'react';
import HeroCard from '../components/hero-card/HeroCard';
import Modal from "react-modal";
import {DataContext} from "../context/DataContext";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";
import {handleError} from "../helpers/handleError";
import {filterData} from "../helpers/filterData";
import useDebounce from '../hooks/useDebounce';

function HeroesPage() {
    const { fetchMarvelData } = useContext(DataContext);
    const [nameStartsWith, setNameStartsWith] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [heroes, setHeroes] = useState(null);
    const [currentHero, setCurrentHero] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);

    const pageSize = 20;
    const currentPage = offset / 20 + 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchMarvelData('characters', pageSize, offset, null, nameStartsWith, null, false);
                console.log(data.results);
                setTotal(data.total);
                if (Array.isArray(data.results)) {
                    const validHeroes = data.results.filter(heroes => {
                        return !heroes.thumbnail.path.endsWith('image_not_available');
                    });
                    setHeroes(validHeroes);
                } else {
                    setHeroes([]);
                }
                setIsLoading(false);
            } catch (error) {
                handleError(error, setError);
            }
        };
        fetchData();
    }, [offset, nameStartsWith, fetchMarvelData, total]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearchChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

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

    const handleSearchChange = async (value) => {
        setNameStartsWith(value);
        try {
            const data = await fetchMarvelData('characters', pageSize, 0, null, value, false);
            setHeroes(data.results);
            setTotal(data.total);
            setIsLoading(false);
        } catch (error) {
            handleError(error, setError);
            setIsLoading(false);
        }
    };

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredHeroes = filterData(heroes, nameStartsWith, 'name');

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
                    onChange={onInputChange}
                />
                <div>Page {currentPage} of {Math.ceil(total / pageSize)} met een totaal van {total} resultaten</div>
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