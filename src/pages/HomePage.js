import React, { useState, useEffect } from 'react';
import EventCard from '../components/event-card/EventCard';
import { fetchMarvelAPI } from '../api';

const HomePage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchMarvelAPI('events')
            .then(allEvents => {
                const shuffled = allEvents.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 5);
                setEvents(selected);
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <main className="home">
            <section className="home__section">
                <h2 className="home__title">Most Popular Heroes</h2>
                <p className="home__content">Placeholder for most popular heroes.</p>
            </section>

            <section className="home__section">
                <h2 className="home__title">Most Popular Comics</h2>
                <p className="home__content">Placeholder for most popular comics.</p>
            </section>

            <section className="home__section">
                <h2 className="home__title">Latest Marvel News</h2>
                <p className="home__content">Placeholder for latest Marvel news.</p>
            </section>

            <section className="home__section">
                <h2 className="home__title">Events</h2>
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </section>

            <section className="home__section">
                <h2 className="home__title">Discover Something New</h2>
                <p className="home__content">Placeholder for a random list of heroes, comics or events.</p>
            </section>
        </main>
    );
};

export default HomePage;

