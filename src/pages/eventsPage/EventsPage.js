import React, { useEffect, useState,useContext } from 'react';
import EventCard from "../../components/event-card/EventCard";
import Modal from "react-modal";
import {DataContext} from "../../context/DataContext";
import PrevNextButton from "../../components/buttons/prevNextButton/PrevNextButton";
import {handleError} from "../../helpers/handleError";
import {filterData} from "../../helpers/filterData";
import useDebounce from '../../hooks/useDebounce';
import styles from './EventsPage.module.css';

const EventsPage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [currentEvent, setCurrentEvent] = useState(null);
    const [events, setEvents] = useState(null);

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
            try {
                const data = await fetchMarvelData('events', pageSize, offset, null, debouncedSearchTerm, null, false);
                console.log(data.results);
                setTotal(data.total);
                if(Array.isArray(data.results)) {
                    setEvents(data.results);
                }else{
                    console.error('Unexpected response:', data.results);
                    setEvents([]);
                }
                setIsLoading(false);
            } catch (error) {
                handleError(error, setError);
            }
        }
        fetchData();
    }, [offset, debouncedSearchTerm, fetchMarvelData]);

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

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = async (value) => {
        setSearchTerm(value);
        try {
            const data = await fetchMarvelData('events', pageSize, 0, null, value, null, false);
            setEvents(data.results);
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

    const filteredEvents = filterData(events, debouncedSearchTerm, 'title');

    return (
        isLoading ? (<div className={styles["loading-container"]}>Loading...</div>) :
            <div className={styles["event-page"]}>
                <h1 className={styles["event-title"]}>Events</h1>
                <input
                    className={styles["event-search"]}
                    type="text"
                    placeholder="Search for an event..."
                    value={searchTerm}
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
                <ul className={styles["event-list"]}>
                    {filteredEvents.map(event =>
                        <li key={event.id} className={styles["event-list-item"]}>
                            <EventCard className={styles["event-card-item"]} event={event} onCardClick={handleEventClick}/>
                        </li>
                    )}
                </ul>
                <div className={styles["page-footer"]}>Page {currentPage} of {Math.ceil(total / pageSize)}</div>
                <PrevNextButton className={styles["page-nav-buttons"]} offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
                <Modal
                    className={styles["modal-content"]}
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Event Details Modal"
                >
                    {currentEvent && <EventCard className={styles["event-card-modal-content"]} event={currentEvent} isModal={true} />}
                </Modal>
                {error && (<div className={styles["error-message"]}>Error: {error}</div>)
                }
            </div>
    );
}
export default EventsPage;