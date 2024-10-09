import React, { useState, useEffect, useRef } from 'react';
import { faceApiBaseUrl } from '../api/square_api';
import { ToastContainer, toast } from 'react-toastify';

import { FaUserGroup } from "react-icons/fa6";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import CustomBreadcrumbs from '../components/tabs/CustomBreadcrumbs';

import DashboardSidebar from '../components/sidebars/MainSidebar';
import MainHeader from '../components/headers/MainHeader';
import WebcamFeed from '../components/feeds/WebcamFeed';

import HorizontalList from '../components/lists/HorizontalList';
import GroupItem from '../components/items/GroupItem';

import { useGroup } from '../hooks/useGroup';

const GroupsPage = () => {
    const videoRef = useRef();

    const {joinedGroups, createdGroups} = useGroup();

    const renderJoinedGroups = () => {
        return joinedGroups.map((group) => {
            return (
                <GroupItem
                    group={group}
                />
            )
        });
    };

    const renderCreatedGroups = () => {
        return createdGroups.map((group) => {
            return (
                <GroupItem
                    group={group}
                />
            )
        });
    };

    return (
        <div className="main-container">
            <ToastContainer />
            <MainHeader />
            <DashboardSidebar />

            <div className='content-area custom-scrollbar'>
                <div className='groups-container'>
                    <div className='groups-header-area'>
                        {/* <CustomBreadcrumbs breadcrumbs={breadcrumbs}/> */}
                    </div>
                    <div className='groups-joined-area'>
                        <div className='d-flex align-items-center mb-3'>
                            <FaUserGroup className='me-2' size={24} />
                            <span className='fs-5 fw-bold'>Joined Groups</span>
                        </div>
                        {!joinedGroups && (
                            <div className=''>
                                No groups joined yet
                            </div>
                        )}
                        {joinedGroups && (
                            <HorizontalList>
                                {renderJoinedGroups()}
                            </HorizontalList>
                        )}
                    </div>
                    <div className='groups-created-area'>
                        <div className='d-flex align-items-center mb-3'>
                            <FaUserGroup className='me-2' size={24} />
                            <span className='fs-5 fw-bold'>Created Groups</span>
                        </div>
                        {!createdGroups && (
                            <div className=''>
                                No groups created yet
                            </div>
                        )}
                        {createdGroups && (
                            <HorizontalList>
                                {renderCreatedGroups()}
                            </HorizontalList>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupsPage;
