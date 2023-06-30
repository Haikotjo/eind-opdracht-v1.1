import React, { useEffect, useState,useContext } from 'react';
import EventCard from "../components/event-card/EventCard";
import Modal from "react-modal";
import HeroCard from "../components/hero-card/HeroCard";
import {DataContext} from "../context/DataContext";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";
import {handleError} from "../helpers/handleError";
import {filterData} from "../helpers/filterData";

const EventsPage = () => {
    const { fetchMarvelData } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState("");

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
        fetchMarvelData('events', pageSize, offset, null, searchTerm, null, false)
            .then(data => {
                console.log(data.results)
                setTotal(data.total)
                if(Array.isArray(data.results)) {
                    setEvents(data.results);
                }else{
                    console.error('Unexpected response:', data.results)
                    setEvents([]);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                handleError(error, setError);
            });
    }, [offset, searchTerm, fetchMarvelData]);

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        fetchMarvelData('events', pageSize, 0, null, event.target.value,null , false)
            .then(data => {
                console.log(data.total)
                setEvents(data.results);
                setTotal(data.total);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Er was een fout bij het ophalen van de event(s): ", error);
                handleError(error, setError);
                setIsLoading(false);
            });
    };

    const filteredEvents = filterData(events, searchTerm, 'title');

    return (
        isLoading ? (
            <div>Loading...</div>
        ) :
        <div className="event-page">
            <h1 className="event-title">Events</h1>
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <input
                className="event-search"
                type="text"
                placeholder="Search for a event..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div>Page {currentPage} of {Math.ceil(total / pageSize)} met een totaal van {total} resultaten</div>
            <div className="event-list" >
                {filteredEvents.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}
            </div>
            <div>Page {currentPage} of {Math.ceil(total / pageSize)}</div>
            <PrevNextButton offset={offset} total={total} onPrevPage={goToPreviousPage} onNextPage={goToNextPage} />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Comic Details Modal"
            >
                {currentEvent && <EventCard event={currentEvent} isModal={true} />}
            </Modal>
            {
                error && (
                    <div>Error: {error}</div>
                )
            }
        </div>
    );
}
export default EventsPage;