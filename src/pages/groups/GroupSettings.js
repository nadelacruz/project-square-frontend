import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { copyToClipboard } from '../../services/CopyService';

import SectionHeader from '../../components/headers/SectionHeader';
import DeleteGroupModal from '../../components/modals/DeleteGroupModal';

import { useGroup } from '../../hooks/useGroup';
import { useLocation } from '../../hooks/useLocation';

const GroupSettings = ({ group }) => {

    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const {
        handleToast,
        handleChange,
        newInputName,
        updateGroup,
        showDeleteGroup,
        toggleDeleteGroup,
        updateState
    } = useGroup();

    const {
        triggerReloadLocation,
    } = useLocation();

    const handleRename = () => {
        if (isRunning || newInputName === null) return;
        setIsRunning(true);
        updateGroup(group.id, newInputName)
            .then(() => {
                handleToast("Group renamed successfully!", 'success');
                updateState({ newInputName: null });
            })
            .catch((e) => {
                console.log("Renaming error: " + e)
            })
            .finally(() => {
                setIsRunning(false);
                triggerReloadLocation();
            });
    };

    const handleCopy = () => {
        if (!isCopied) {
            setIsCopied(true);
            copyToClipboard(group.code);

            setTimeout(() => {
                setIsCopied(false);
            }, 15000);
        }
    };

    return (
        <>
            <DeleteGroupModal
                show={showDeleteGroup}
                onClose={toggleDeleteGroup}
                group={group}
            />
            <div className='group-locations-area' >
                <div style={{ width: '100%', maxWidth: '800px' }} className='slide-up'>
                    <SectionHeader
                        title={"Group Settings"}
                    />
                    <div className='fs-6 mb-2' style={{ fontWeight: '600' }}>Group name</div>
                    <div className='w-100 d-flex align-items-center'>
                        <input
                            name='newInputName'
                            type='text'
                            placeholder={group.name}
                            value={newInputName}
                            onChange={handleChange}
                            className="form-control w-50"
                            style={{ maxWidth: '300px' }}
                        />
                        <button
                            className='main-button ms-2'
                            disabled={isRunning}
                            onClick={handleRename}
                        >
                            {(isRunning) ? "Renaming..." : "Rename"}
                        </button>
                    </div>

                    <div className='fs-6 mb-1 mt-4' style={{ fontWeight: '600' }}>Share group</div>
                    <div className='small mb-2'>Use the code below to let other users join this group.</div>
                    <div className='w-100 mb-5 d-flex align-items-center'>
                        <input
                            value={group.code}
                            className="form-control w-25"
                            disabled
                        />
                        <button
                            className='main-button ms-2'
                            disabled={isCopied}
                            onClick={handleCopy}
                        >
                            {(isCopied) ? "Copied" : "Copy"}
                        </button>
                    </div>

                    <SectionHeader
                        title={"Danger Zone"}
                    />
                    <div className='fs-6 mb-1 mt-4' style={{ fontWeight: '600' }}>Delete this group</div>
                    <div className='small mb-3'>Once you delete this group, there is no way to recover it. Please be certain.</div>
                    <button
                        className='danger-button fst-italic'
                        onClick={toggleDeleteGroup}
                    >
                        Delete group
                    </button>

                </div>
            </div>

        </>
    );
}

export default GroupSettings;
