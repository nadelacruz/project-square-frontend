import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { RiGroupLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { MdGroups } from "react-icons/md";

import StorageService from "../../services/StorageService";

import { useGroup } from "../../hooks/useGroup";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DeleteGroupModal = ({ show, onClose, group }) => {
    const ss = new StorageService();

    const navigate = useNavigate();

    const { user } = useAuth();
    const {
        BUTTON_TEXT,
        updateState,
        handleToast,
        handleChange,
        deleteInputName,
        deleteGroup,
    } = useGroup();

    const [buttonText, setButtonText] = useState(BUTTON_TEXT.DELETE);

    const disabled = buttonText === BUTTON_TEXT.DELETING ||
        deleteInputName === null ||
        deleteInputName !== group.name;

    const handleClose = () => {
        onClose();
        updateState({ deleteInputName: null });
    }

    const handleSubmit = async () => {
        if (disabled) return;
        try {
            setButtonText(BUTTON_TEXT.DELETING);

            await deleteGroup(group.id, deleteInputName.trim(), user.id);
            navigate("/groups");
            setTimeout(() => {
                handleToast("Group deleted successfully.", 'info');
            }, 100);
        } catch (error) {
            console.error(error);
            handleToast(error.response.data.error, 'error');
        } finally {
            setButtonText(BUTTON_TEXT.DELETE);
            updateState({ deleteInputName: null, });
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
            backdrop={"static"}
            onHide={() => { handleClose() }}
            contentClassName="upload-modal-dialog"
            scrollable
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="text-white">
                    <div className='fs-6 '>Delete group</div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="custom-scrollbar text-white" closeButton>
                <div className="mb-4 d-flex flex-column align-items-center">
                    <MdGroups size={30} />
                    <div className='fs-4 mb-3 unselectable' style={{ fontWeight: '500' }}>{group.name}</div>
                    <div className="d-flex align-items-center justify-content-center" style={{ fontWeight: '200' }}>
                        <RiGroupLine size={16} />
                        <div className='small ms-2 me-3'>{`${group.members_count} members`}</div>
                        <SlLocationPin size={16} />
                        <div className='small ms-2'>{`${group.locations_count} locations`}</div>
                    </div>
                </div>
                <div className='small mb-2 unselectable'>{`To confirm, type "${group.name}" in the box below`}</div>
                <input
                    name='deleteInputName' // must be same with state in useLocation
                    type='text'
                    placeholder={""}
                    value={deleteInputName}
                    onChange={handleChange}
                    required
                    className="form-control mb-4"
                    style={{ borderColor: 'red' }}
                />
                <button
                    className='danger-button w-100'
                    disabled={disabled}
                    onClick={() => { handleSubmit() }}
                >
                    {buttonText === BUTTON_TEXT.DELETING && <Spinner size='sm' variant="light" />}
                    <span className='text-white ms-2'>{buttonText}</span>
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default DeleteGroupModal;