import React from 'react';
import SaveButton from "../buttons/addToFavorite/SaveButton";
import styles from "./CustomModal.module.scss";

const CustomModal = ({
                         isModalVisible,
                         handleOk,
                         handleCancel,
                         selectedItem,
                         itemKey,
                         title,
                         children
                     }) => {

    // Als de modal niet zichtbaar is, return dan null (render niets)
    if (!isModalVisible) {
        return null;
    }

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    }

    // Anders, render de modal met de bijbehorende content
    return (
        <div className={styles.modal} onClick={handleBackgroundClick}>
            <div className={styles.content}>
                <button className={styles.close} onClick={handleCancel}>X</button>
                <h2>{title}</h2>
                {/* Als er een geselecteerd item is, toon dan de SaveButton, titel, beschrijving en afbeelding van het item */}
                {selectedItem && (
                    <>
                        <SaveButton itemKey={itemKey} item={selectedItem} />
                        <h2>{selectedItem.title || selectedItem.name}</h2>
                        <p>{selectedItem.description}</p>
                        <img
                            src={`${selectedItem.thumbnail.path}/portrait_incredible.${selectedItem.thumbnail.extension}`}
                            alt={selectedItem.title || selectedItem.name}
                        />
                        {/* Render eventuele children die zijn doorgegeven aan de CustomModal component */}
                        {children}
                    </>
                )}
            </div>
        </div>
    );
}

// Exporteer de CustomModal component voor gebruik in andere bestanden
export default CustomModal;
