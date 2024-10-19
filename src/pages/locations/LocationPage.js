import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { faceApiBaseUrl } from '../../api/square_api';
import { ToastContainer, toast } from 'react-toastify';

import { FaUserGroup } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MainContainer from '../../components/containers/MainContainer';

import GroupLocationsLoading from './GroupLocationsLoading';
import GroupAnalyticsItem from '../../components/items/GroupAnalyticsItem';
import LocationItem from '../../components/items/LocationItem';
import GroupLocationsHeader from '../../components/headers/GroupLocationsHeader';
import SectionHeader from '../../components/headers/SectionHeader';

import { useLocation } from '../../hooks/useLocation'

const LocationPage = () => { 
    const { id } = useParams();

    return (
        <MainContainer>
            <div className='location-cameras-container'>
                <div className='location-header-area'>
                    header
                </div>
                <div className='location-list-area'>
                    list
                </div>
            </div>
        </MainContainer>
    );
}

export default LocationPage;
