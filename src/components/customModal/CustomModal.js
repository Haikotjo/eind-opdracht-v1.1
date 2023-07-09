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
    if (!isModalVisible) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h2>{title}</h2>
                {selectedItem && (
                    <>
                        <SaveButton itemKey={itemKey} item={selectedItem} />
                        <h2>{selectedItem.title || selectedItem.name}</h2>
                        <p>{selectedItem.description}</p>
                        <img
                            src={`${selectedItem.thumbnail.path}/portrait_incredible.${selectedItem.thumbnail.extension}`}
                            alt={selectedItem.title || selectedItem.name}
                        />
                        {children}
                        <div className={styles.buttons}>
                            <button onClick={handleOk}>OK</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CustomModal;
