// import React, { useState, createContext, useContext } from 'react';
//
// const ModalContext = createContext();
//
// export const ModalProvider = ({ children }) => {
//     const [activeModal, setActiveModal] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     return (
//         <ModalContext.Provider value={{ activeModal, setActiveModal, isModalOpen, setIsModalOpen }}>
//             {children}
//         </ModalContext.Provider>
//     );
// };
//
// export const useModal = () => {
//     return useContext(ModalContext);
// };
