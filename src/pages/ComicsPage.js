import React, { useEffect, useState, useContext  } from 'react';
import ComicCard from '../components/comic-card/ComicCard';
import Modal from "react-modal";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";
import { DataContext } from '../context/DataContext'

const ComicsPage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const [comics, setComics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentComic, setCurrentComic] = useState(null);
    const [titleStartsWith, setTitleStartsWith] = useState("");
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetchMarvelData('comics', 20, offset, null, null, titleStartsWith, true)
            .then(response => {
                console.log(response)
                if(Array.isArray(response)){
                    setComics(response);
                    setTotal(response.length)
                }else{
                    console.error('Unexpected response:', response)
                    setComics([]);
                    setTotal(0);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de comics:', error);
            });
    }, [offset, titleStartsWith, fetchMarvelData]);

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
        fetchMarvelData('comics', 20, 0, null, null, event.target.value, true)
            .then(response => {
                setComics(response);
                setTotal(response.length);
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
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="comics-search"
                type="text"
                placeholder="Search for a comic..."
                value={titleStartsWith}
                onChange={handleSearchChange}
            />
            {total < 20 && (
                <p>{total} resultaten</p>
            )}
            <div className="heroes-list" >
                {filteredComics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick}/>)}
            </div>
            {/*{comics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick} />)}*/}
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
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
