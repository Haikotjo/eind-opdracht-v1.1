import React from 'react';
import { Modal, Button } from 'antd';
import SaveButton from "../buttons/addToFavorite/SaveButton";

const CustomModal = ({
                         isModalVisible,
                         handleOk,
                         handleCancel,
                         selectedItem,
                         itemKey,
                         title,
                         children
                     }) => {
    return (
        <Modal title={title} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                </>
            )}
        </Modal>
    );
}

export default CustomModal;
