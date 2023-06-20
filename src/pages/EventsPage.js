import React, { useEffect, useState,useContext } from 'react';
import EventCard from "../components/event-card/EventCard";
import Modal from "react-modal";
import HeroCard from "../components/hero-card/HeroCard";
import {DataContext} from "../context/DataContext";
import PrevNextButton from "../components/buttons/prevNextButton/PrevNextButton";

const EventsPage = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [total, setTotal] = useState(null);
    const { fetchMarvelData } = useContext(DataContext);
    const [error, setError] = useState(null);
    const currentPage = offset / 20 + 1;

    useEffect(() => {
        fetchMarvelData('events', 20, offset, null, searchTerm, null, false)
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
            .catch(error => {
                setError('Er was een fout bij het ophalen van de events.');
                console.error('Er was een fout bij het ophalen van de events:', error);
                setIsLoading(false);
            });
    }, [offset, searchTerm, fetchMarvelData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    function goToNextPage() {
        setOffset(offset + 20);
    }
    function goToPreviousPage() {
        setOffset(Math.max(0, offset - 20));
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
        fetchMarvelData('events', 20, 0, null, event.target.value,null , false)
            .then(data => {
                console.log(data.total)
                setEvents(data.results);
                setTotal(data.total);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van het event: ", error);
                setIsLoading(false);
            });
    };


    const filteredEvents = events.filter(events =>
        events.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div>Page {currentPage} of {Math.ceil(total / 20)} met een totaal van {total} resultaten</div>
            <div className="event-list" >
                {filteredEvents.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}
            </div>
            <div>Page {currentPage} of {Math.ceil(total / 20)}</div>
            {/*{events.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}*/}
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