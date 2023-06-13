import React from 'react';

const HomePage = () => {
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
                <p className="home__content">Placeholder for events.</p>
            </section>

            <section className="home__section">
                <h2 className="home__title">Discover Something New</h2>
                <p className="home__content">Placeholder for a random list of heroes, comics or events.</p>
            </section>
        </main>
    );
};

export default HomePage;

