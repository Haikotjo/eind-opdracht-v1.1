import React, { useEffect, useState, useContext  } from 'react';
import ComicCard from '../components/comic-card/ComicCard';
import Modal from "react-modal";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";
import { DataContext } from '../context/DataContext'
import {handleError} from "../helpers/handleError";
import {filterData} from "../helpers/filterData";

const ComicsPage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const [titleStartsWith, setTitleStartsWith] = useState("");

    const [currentComic, setCurrentComic] = useState(null);
    const [comics, setComics] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);

    const pageSize = 20
    const currentPage = offset / pageSize + 1;

    // Fetch data from the Marvel API when component mounts and when offset or titleStartsWith changes
    useEffect(() => {
        fetchMarvelData('comics', pageSize, offset, null, null, titleStartsWith, false)
            .then(data => {
                console.log(data)
                setTotal(data.total)
                if(Array.isArray(data.results)){
                    setComics(data.results);
                    const validComics = data.results.filter(comic => {
                        return !comic.thumbnail.path.endsWith('image_not_available');
                    });
                    setComics(validComics);
                }else{
                    console.error('Unexpected response:', data.results)
                    setComics([]);}
                setIsLoading(false);
            })
            .catch((error) => {
                handleError(error, setError);
            });
    }, [offset, titleStartsWith, fetchMarvelData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    function goToNextPage() {
        setOffset(offset + pageSize);
    }
    function goToPreviousPage() {
        setOffset(Math.max(0, offset - pageSize));
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
        fetchMarvelData('comics', pageSize, 0, null, null, event.target.value, false)
            .then(data => {
                console.log(data.total)
                setComics(data.results);
                setTotal(data.total);
                setIsLoading(false);
                console.log('Total after setTotal:', total);
            })
            .catch((error) => {
                console.error("Er was een fout bij het ophalen van de comic(s): ", error);
                handleError(error, setError);
                setIsLoading(false);
            });
    };

    const filteredComics = filterData(comics, titleStartsWith, 'title');

    return (
        isLoading ? (<div>Loading...</div>) :
        <div className="comics-page">
            <h1 className="comic-title">Comics</h1>
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
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
            <PrevNextButton currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Comic Details Modal"
            >
                {currentComic && <ComicCard comic={currentComic} isModal={true} />}
            </Modal>
            {error && (<div>Error: {error}</div>)
            }
        </div>
    );
}
export default ComicsPage;
