import React, { useState, useEffect, useRef } from 'react';


import MainContainer from '../components/containers/MainContainer';
import Dropdown from '../components/dropdowns/Dropdown';

import { IoNotifications } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import { useAuth } from '../hooks/useAuth';
import { useGroup } from '../hooks/useGroup';
import { useRecognize } from '../hooks/useRecognize';
import { useNavigate } from 'react-router-dom';

// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.1.2:554/live/ch00_0"; // Appartment Network
// const rtspurl = "rtsp://CAPSTONE:@CAPSTONE1@192.168.254.104:554/live/ch00_0"; // Home Network

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { toggleCreateGroup, toggleJoinGroup } = useGroup();

    const navigate = useNavigate();

    return (
        <MainContainer>
            <div className='dashboard-container'>
                <div className='dashboard-header-area'>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center'>
                            <Dropdown icon={<IoMdAdd size={25} />} title={"Add"}>
                                <div className='icon-dropdown-item' onClick={toggleCreateGroup}>
                                    <IoMdAdd size={25} title='Create Group' />
                                    <span className='icon-dropdown-text'>Create group</span>
                                </div>
                                <div className='icon-dropdown-item' onClick={toggleJoinGroup}>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default DashboardPage;
