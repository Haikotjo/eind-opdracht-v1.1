import { useState } from 'react';

// De useModal hook beheert de open/sluit staat van meerdere modals.
export function useModal() {
    // Deze state houdt bij welke modals open zijn.
    const [isModalOpen, setIsModalOpen] = useState({});

    // Deze functie opent of sluit een modal gebaseerd op zijn id.
    function toggleModal(id) {
        setIsModalOpen(prevState => ({...prevState, [id]: !prevState[id]}));
    }

    // Deze functie sluit alle modals.
    function closeAllModals() {
        setIsModalOpen({});
    }

    return [isModalOpen, toggleModal, closeAllModals];
}
