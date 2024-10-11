import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
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

import GroupAnalyticsItem from '../../components/items/GroupAnalyticsItem';
import LocationItem from '../../components/items/LocationItem';
import GroupLocationsHeader from '../../components/headers/GroupLocationsHeader';
import SectionHeader from '../../components/headers/SectionHeader';

import { useGroup } from '../../hooks/useGroup';

const GroupLocationsPage = () => {
    const { id } = useParams();

    const { getGroupLocations } = useGroup();

    const [data, setData] = useState(null);
    const [relaod, setReload] = useState(false);

    const sampleAnalytics = [
        { name: 'Frequency' },
        { name: 'Mean' },
        { name: 'Median' },
        { name: 'Mode' },
    ];

    const sampleLocations = [
        { name: 'Location 1' },
        { name: 'Location 2' },
        { name: 'Location 3' },
        { name: 'Location 4' },
        { name: 'Location 5' },
        { name: 'Location 6' },
    ];

    useEffect(() => {
        const debouncedGetGroupLocations = debounce(getGroupLocations, 500);

        getGroupLocations(id).then((data) => {
            setData(data);
        }).catch((e) => {
            console.log("Error while getting group locations data: " + e);
        });
    }, [id, relaod]);

    const renderAnalytics = () => {
        return sampleAnalytics.map((analytics, index) => {
            return (
                <GroupAnalyticsItem
                    analytics={analytics}
                    key={index}
                />
            )
        });
    };

    const renderLocations = () => {
        return (
            <>
                <LocationItem location={{ name: 'ADD' }} />
                {sampleLocations.map((location, index) => {
                    return (
                        <LocationItem
                            location={location}
                            key={index}
                        />
                    )
                })}
            </>
        )
    };

    return (
        <MainContainer>
            {!data && (
                <div>Loading the page...</div>
            )}
            {data && (
                <div className='group-locations-container'>
                    <div className='group-locations-header-area'>
                        <GroupLocationsHeader group={data.group} />
                    </div>
                    <div className='group-analytics-area '>
                        <SectionHeader
                            icon={<IoAnalyticsSharp className='me-2' size={24} />}
                            title={"Analytics"}
                        />
                        <div className='group-grid-display'>
                            {renderAnalytics()}
                        </div>
                    </div>
                    <div className='group-locations-area'>
                        <SectionHeader
                            icon={<ImLocation className='me-2' size={24} />}
                            title={"Locations"}
                            actions={
                                <div className='d-flex align-items-center'>
                                    <FaList size={25} className='me-4 cursor-pointer' />
                                    <BsFillGrid3X3GapFill size={25} className='cursor-pointer' />
                                </div>
                            }
                        />
                        <div className='group-grid-display'>
                            {renderLocations()}
                        </div>
                    </div>
                </div>
            )}
        </MainContainer>
    );
}

export default GroupLocationsPage;
