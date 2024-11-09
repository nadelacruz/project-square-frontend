import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { useLocation } from "../../hooks/useLocation";

const CreateLocationModal = ({ show, onClose, group }) => {

    const {
        BUTTON_TEXT,
        updateState,
        handleToast,
        handleChange,
        inputName,
        createLocation,
        triggerReloadLocation,
    } = useLocation();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.CREATE);

    const handleClose = () => {
        onClose();
        updateState({ inputName: null}); 
    }

    const handleSubmit = async () => {
        try {
            setButtonText(BUTTON_TEXT.CREATING);

            const location = await createLocation(inputName.trim(), group.id);
            handleToast(`Location "${location.name}" created successfully`, 'success');
        } catch (error) {
            console.error(error);
            handleToast(error.message, 'error');
        } finally {
            triggerReloadLocation(); //Reloads the Group page
            setButtonText(BUTTON_TEXT.CREATE);
            updateState({ inputName: null,}); 
            handleClose();
        }
    }

    return (
        <Modal
            aria-labe7lledby="contained-modal-title-vcenter"
            data-bs-theme="dark"
            centered
            show={show}
            keyboard={false}
            onHide={() => { handleClose() }}
            contentClassName="upload-modal-dialog"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                    Add new location
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="threel-scrollbar text-white" closeButton>
                <input
                    name='inputName' // must be same with state in useLocation
                    type='text'
                    placeholder='Name'
                    value={inputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                />
                <button
                    className='group-forms-btn'
                    disabled={buttonText === BUTTON_TEXT.CREATING}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.CREATING && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default CreateLocationModal;