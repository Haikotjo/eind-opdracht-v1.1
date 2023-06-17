import React, { useEffect, useState } from 'react';
import { fetchMarvelAPI } from '../api';
import ComicCard from '../components/comic-card/ComicCard';
import Modal from "react-modal";

const ComicsPage = () => {
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);
    const [titleStartsWith, setTitleStartsWith] = useState("");
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetchMarvelAPI('comics', 20, offset, null, null, titleStartsWith)
            .then(response => {
                console.log(response.length)
                console.log(response.data.total)
                setComics(response);
                setIsLoading(false);
                setTotal(response.length)

            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de comics:', error);
            });
    }, [offset, titleStartsWith]);

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

    const handleSearchChange = (event) => {
        setTitleStartsWith(event.target.value);
        fetchMarvelAPI('comics', 20, 0, null, null, event.target.value)
            .then(response => {
                setComics(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van de comics: ", error);
                setIsLoading(false);
            });
    };


    const filteredComics = comics.filter(comic =>
        comic.title.toLowerCase().includes(titleStartsWith.toLowerCase())
    );

    return (
        <div className="comics-page">
            <h1 className="comic-title">Comics</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={total <= 19}>Volgende</button>
            <input
                className="comics-search"
                type="text"
                placeholder="Search for a comic..."
                value={titleStartsWith}
                onChange={handleSearchChange} // Use the handleSearchChange function when the input changes
            />
            {total < 20 && (
                <p>{total} resultaten</p>
            )}
            <div className="heroes-list" >
                {filteredComics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick}/>)}
            </div>
            {/*{comics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick} />)}*/}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={total <= 19}>Volgende</button>
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
