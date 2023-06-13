import React from 'react';

function EventsPage() {
    return (
        <div className="events-page">
            <h1 className="events-title">Heroes</h1>
            <input className="events-search" type="text" placeholder="Search for a hero..." />
            <div className="events-list">
                {/* Hier zullen later de HeroCard componenten komen */}
            </div>
        </div>
    );
}

export default EventsPage;
