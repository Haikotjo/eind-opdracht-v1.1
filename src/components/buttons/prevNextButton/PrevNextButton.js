import React from 'react';
import './PrevNextButton.js.css'

function PrevNextButton({ currentPage, totalPages, onPrevPage, onNextPage }) {
    return (
        <div className="nav-buttons-container">
            <button className="nav-button" onClick={onPrevPage} disabled={currentPage === 1}>Vorige</button>
            <button className="nav-button" onClick={onNextPage} disabled={currentPage >= totalPages}>Volgende</button>
        </div>
    );
}

export default PrevNextButton;
