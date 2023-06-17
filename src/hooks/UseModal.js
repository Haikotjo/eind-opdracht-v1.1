import { useState } from 'react';
export function useModal() {
    const [isModalOpen, setIsModalOpen] = useState({});

    function toggleModal(id) {
        setIsModalOpen(prevState => ({...prevState, [id]: !prevState[id]}));
    }

    function closeAllModals() {
        setIsModalOpen({});
    }

    return [isModalOpen, toggleModal, closeAllModals];
}