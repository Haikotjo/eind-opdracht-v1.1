import React, { useEffect, useState } from 'react';
import { fetchMarvelAPI } from '../api';
import ComicCard from '../components/comic-card/ComicCard';
import HeroCard from "../components/hero-card/HeroCard";
import Modal from "react-modal";

const ComicsPage = () => {
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);

    useEffect(() => {
        fetchMarvelAPI('comics', 20, offset)
            .then(response => {
                 setComics(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de comics:', error);
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

    const handleComicClick = (comic) => {
        setCurrentComic(comic);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="comics-page">
            <h1 className="comic-title">Comics</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            {comics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick} />)}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Comic Details Modal"
            >
                {currentComic && <ComicCard comic={currentComic} isModal={true} />}
            </Modal>
        </div>
    );
}
export default ComicsPage;
