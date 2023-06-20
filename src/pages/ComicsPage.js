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
    const [error, setError] = useState(null);
    const currentPage = offset / 20 + 1;

    useEffect(() => {
        fetchMarvelData('comics', 20, offset, null, null, titleStartsWith, false)
            .then(data => {
                console.log(data)
                setTotal(data.total)
                if(Array.isArray(data.results)){
                    setComics(data.results);
                    // setTotal(response.length)
                }else{
                    console.error('Unexpected response:', data.results)
                    setComics([]);
                    // setTotal(0);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError('Er was een fout bij het ophalen van de comics.');
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
        fetchMarvelData('comics', 20, 0, null, null, event.target.value, false)
            .then(data => {
                console.log(data.total)
                setComics(data.results);
                setTotal(data.total);
                setIsLoading(false);
                console.log('Total after setTotal:', total);
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
        isLoading ? (
                <div>Loading...</div>
            ) :
        <div className="comics-page">
            <h1 className="comic-title">Comics</h1>
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / 20)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="comics-search"
                type="text"
                placeholder="Search for a comic..."
                value={titleStartsWith}
                onChange={handleSearchChange}
            />
            <div>Page {currentPage} of {Math.ceil(total / 20)} met een totaal van {total} resultaten</div>
            <div className="heroes-list" >
                {filteredComics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick}/>)}
            </div>
            {/*{comics.map(comic => <ComicCard key={comic.id} comic={comic} onCardClick={handleComicClick} />)}*/}
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / 20)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Comic Details Modal"
            >
                {currentComic && <ComicCard comic={currentComic} isModal={true} />}
            </Modal>
            {
                error && (
                    <div>Error: {error}</div>
                )
            }
        </div>
    );
}
export default ComicsPage;
