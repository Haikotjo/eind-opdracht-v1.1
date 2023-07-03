import React, { useEffect, useState, useContext  } from 'react';
import ComicCard from '../../components/comic-card/ComicCard';
import Modal from "react-modal";
import PrevNextButton from "../../components/buttons/prevNextButton/PrevNextButton";
import { DataContext } from '../../context/DataContext'
import {handleError} from "../../helpers/handleError";
import {filterData} from "../../helpers/filterData";
import useDebounce from '../../hooks/useDebounce';
import { useParams } from 'react-router-dom';
import styles from './ComicsPage.module.css';

const ComicsPage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const [titleStartsWith, setTitleStartsWith] = useState("");
    const debouncedTitleStartsWith = useDebounce(titleStartsWith, 1000);

    const [currentComic, setCurrentComic] = useState(null);
    const [comics, setComics] = useState(null);
    const { comicId } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);

    const [offset, setOffset] = useState(0);

    const pageSize = 20
    const currentPage = offset / pageSize + 1;

    // Fetch data from the Marvel API when component mounts and when offset or titleStartsWith changes
    useEffect(() => {
        const fetchData = async () => {
            if (comicId) {
                try {
                    const response = await fetchMarvelData('comics', null, null, comicId, null, null, true);
                    setCurrentComic(response[0]);
                    setIsModalOpen(true);
                } catch (error) {
                    console.error("Er was een fout bij het ophalen van de comic: ", error);
                }
            }

            try {
                const data = await fetchMarvelData('comics', pageSize, offset, null, null, debouncedTitleStartsWith, false);
                console.log(data);
                setTotal(data.total);
                if (Array.isArray(data.results)) {
                    const validComics = data.results.filter(comic => {
                        return !comic.thumbnail.path.endsWith('image_not_available');
                    });
                    setComics(validComics);
                } else {
                    console.error('Unexpected response:', data.results);
                    setComics([]);
                }
                setIsLoading(false);
            } catch (error) {
                handleError(error, setError);
            }
        }
        fetchData();
    }, [comicId, offset, debouncedTitleStartsWith, fetchMarvelData]);


    useEffect(() => {
        if (debouncedTitleStartsWith) {
            handleSearchChange(debouncedTitleStartsWith);
        }
    }, [debouncedTitleStartsWith]);

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


    const handleSearchChange = async (value) => {
        setTitleStartsWith(value);
        try {
            const data = await fetchMarvelData('comics', pageSize, 0, null, null, value, false);
            console.log(data.total);
            setComics(data.results);
            setTotal(data.total);
            setIsLoading(false);
            console.log('Total after setTotal:', total);
        } catch (error) {
            console.error("Er was een fout bij het ophalen van de comic(s): ", error);
            handleError(error, setError);
            setIsLoading(false);
        }
    };

    const onInputChange = (event) => {
        setTitleStartsWith(event.target.value);
    };

    const filteredComics = filterData(comics, debouncedTitleStartsWith, 'title');

    return (
        isLoading ? (<div className={styles["loading-container"]}>Loading...</div>) :
            <div className={styles["comics-page"]}>
                <h1 className={styles["comic-title"]}>Comics</h1>
                <input
                    className={styles["comics-search"]}
                    type="text"
                    placeholder="Search for a comic..."
                    value={titleStartsWith}
                    onChange={onInputChange}
                />
                <div className={styles["page-details"]}>Page {currentPage} of {Math.ceil(total / pageSize)} with a total of {total} results</div>
                <PrevNextButton
                    className={styles["page-nav-buttons"]}
                    currentPage={currentPage}
                    totalPages={Math.ceil(total / pageSize)}
                    onPrevPage={goToPreviousPage}
                    onNextPage={goToNextPage}
                />
                <ul className={styles["comics-list"]} >
                    {filteredComics.map(comic =>
                        <li key={comic.id} className={styles["comic-list-item"]}>
                            <ComicCard className={styles["comic-card-item"]} comic={comic} onCardClick={handleComicClick}/>
                        </li>
                    )}
                </ul>
                <PrevNextButton className={styles["page-nav-buttons"]} currentPage={currentPage} totalPages={Math.ceil(total / pageSize)} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
                <Modal
                    className={styles["modal-content"]}
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Comic Details Modal"
                >
                    {currentComic && <ComicCard className={styles["comic-card-modal-content"]}comic={currentComic} isModal={true} />}
                </Modal>
                {error && (<div className={styles["error-message"]}>Error: {error}</div>)
                }
            </div>
    );
}
export default ComicsPage;
