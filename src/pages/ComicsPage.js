import React from 'react';

function ComicsPage() {
    return (
        <div className="comics-page">
            <h1 className="comics-title">Heroes</h1>
            <input className="comics-search" type="text" placeholder="Search for a hero..." />
            <div className="comics-list">
                {/* Hier zullen later de HeroCard componenten komen */}
            </div>
        </div>
    );
}

export default ComicsPage;
