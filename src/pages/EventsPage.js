import React, { useEffect, useState } from 'react';
import { fetchMarvelAPI } from '../api';
import EventCard from "../components/event-card/EventCard";
import Modal from "react-modal";
import HeroCard from "../components/hero-card/HeroCard";

const EventsPage = () => {
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [titleStartsWith, setTitleStartsWith] = useState("");
    const [total, setTotal] = useState(null);

    useEffect(() => {
        fetchMarvelAPI('events', 20, offset, null, titleStartsWith)
            .then(response => {

                console.log(response.length)
                setEvents(response);
                setIsLoading(false);
                setTotal(response.length)
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de events:', error);
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

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSearchChange = (event) => {
        setTitleStartsWith(event.target.value);
        fetchMarvelAPI('events', 20, 0, null, event.target.value)
            .then(response => {
                setEvents(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Er was een fout bij het ophalen van het event: ", error);
                setIsLoading(false);
            });
    };


    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(titleStartsWith.toLowerCase())
    );

    return (
        <div className="event-page">
            <h1 className="event-title">Events</h1>
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={total <= 19}>Volgende</button>
            <input
                className="event-search"
                type="text"
                placeholder="Search for a event..."
                value={titleStartsWith}
                onChange={handleSearchChange} // Use the handleSearchChange function when the input changes
            />
            {total < 20 && (
                <p>{total} resultaten</p>
            )}
            <div className="event-list" >
                {filteredEvents.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}
            </div>
            {/*{events.map(event => <EventCard key={event.id} event={event} onCardClick={handleEventClick}/>)}*/}
            <button onClick={goToPreviousPage} disabled={offset === 0}>Vorige</button>
            <button onClick={goToNextPage} disabled={total <= 19}>Volgende</button>
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