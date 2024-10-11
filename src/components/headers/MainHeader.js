import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../../hooks/useAuth";
import { useRecognize } from '../../hooks/useRecognize';

import { TiThMenu } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import Dropdown from '../dropdowns/Dropdown';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';

import { useSidebar } from '../../hooks/useSidebar';

const MainHeader = () => {
    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { setCollapse, collapse } = useSidebar();

    const navigate = useNavigate();

    const [showCreate, setCreate] = useState(false);
    const [showJoin, setJoin] = useState(false);

    return (
        <header className='header-area'>
            <CreateGroupModal 
                show={showCreate}
                onClose={() => {setCreate(false)}}
            />

            <JoinGroupModal 
                show={showJoin}
                onClose={() => {setJoin(false)}}
            />

            <div className='d-flex align-items-center'>
                <TiThMenu 
                    size={48} 
                    title='Square Menu'
                    onClick={() => { setCollapse(!collapse) }} 
                    className='header-icons' 
                />
                <div className='logo-container ms-3 prevent-select'>
                    <div className='logo-div'>
                        <img
                            src={"/images/resight2.png"}
                            alt={`resight logo`}
                        />
                    </div>
                    <span className='logo-text'>SQUARE</span>
                </div>
            </div>
            {(!user) && (
                <div class='justify-content-between'>
                    <Button
                        onClick={() => { navigate('/auth/login') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                            marginRight: '12px ',
                        }}
                    >
                        LOGIN
                    </Button>
                    <Button
                        onClick={() => { navigate('/auth/register') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                        }}
                    >
                        REGISTER
                    </Button>
                </div>
            )}
            {(user) && (
                <div className='d-flex align-items-center'>
                    <div className='d-flex align-items-center'>
                        <Dropdown icon={<IoMdAdd size={25} />} title={"Add"}>
                            <div className='icon-dropdown-item' onClick={() => {setCreate(!showCreate)}}>
                                <IoMdAdd size={25} title='Create Group' />
                                <span className='icon-dropdown-text'>Create group</span>
                            </div>
                            <div className='icon-dropdown-item' onClick={() => {setJoin(!showJoin)}}>
                                <IoMdAdd size={25} title='Join Group' />
                                <span className='icon-dropdown-text'>Join group</span>
                            </div>
                        </Dropdown>
                        <Dropdown icon={<IoNotifications size={24} />} title={"Notifications"}>
                            <div className='icon-dropdown-item' onClick={() => { }}>
                                <IoNotifications size={24} title='Notifications' />
                                <span className='icon-dropdown-text'>Notifications</span>
                            </div>
                        </Dropdown>
                    </div>
                    <div className='d-flex align-items-center ms-4'>
                        <div className='header-user-div prevent-select'>
                            <img
                                src={"/images/user_default.jpg"}
                                alt={`user_image`}
                            />
                        </div>
                        <div className='me-3'>
                            <div className='small'>
                                {user.email}
                            </div>
                            <button
                                onClick={() => {
                                    logout().then(() => {
                                        navigate('/', { replace: true })
                                    })
                                }}
                                className='logout-btn'
                                disabled={isScanning}
                            >
                                {(isScanning) ? 'Still Scanning...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default MainHeader;
