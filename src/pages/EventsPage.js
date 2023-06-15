import React, { useEffect, useState } from 'react';
import { fetchMarvelAPI } from '../api';
import EventCard from "../components/event-card/EventCard";
import Modal from "react-modal";

const EventsPage = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    useEffect(() => {
        fetchMarvelAPI('events', 20, offset)
            .then(response => {
                setEvents(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de evenst:', error);
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

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="event-page">
            <h1 className="event-title">Events</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            {events.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage}>Volgende</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Comic Details Modal"
            >
                {currentEvent && <EventCard event={currentEvent} isModal={true} />}
            </Modal>
        </div>
    );
}
export default EventsPage;