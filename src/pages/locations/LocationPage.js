import React, { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import MainContainer from '../../components/containers/MainContainer';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';
import SectionHeader from '../../components/headers/SectionHeader';

import WebcamFeed from '../../components/feeds/WebcamFeed';
import AttendanceList from '../../components/lists/AttendanceList';
import FeedsActionBar from '../../components/bars/FeedsActionBar';
import CameraItem from '../../components/items/CameraItem';

import { useParams } from 'react-router-dom';
import { useRecognize } from '../../hooks/useRecognize';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';
import { useFeeds } from '../../hooks/useFeeds';


const LocationPage = () => {
    const { id } = useParams();
    const { setBreadcrumbs, clearBreadcrumbs } = useBreadcrumbs();
    const {
        isScanning,
        handleScan,
        videoRef
    } = useRecognize();
    const {
        GRIDS,
        grid,
        gridDims,
        updateState,
        renderEmptySlots
    } = useFeeds();


    useEffect(() => {
        const feedsGrid = document.querySelector('.feeds-grid');
        if (feedsGrid) {
            const observer = new ResizeObserver(entries => {
                requestAnimationFrame(() => {
                    for (let entry of entries) {
                        const height = entry.contentRect.height;
                        const width = entry.contentRect.width;
                        updateState({
                            gridDims: {
                                width: width,
                                height: height
                            }
                        });
                    }
                });
            });
            observer.observe(feedsGrid);
            return () => observer.disconnect();
        }
    }, []);

    const location = {
        group: { name: "Some Group", id: 99 },
        name: "Location 1",
        id: 1
    };

    const cameras = [
        { name: "Camera 1", ip: "192.168.254.106" },
        { name: "Camera 2", ip: "192.168.254.107" },
        { name: "Camera 3", ip: "192.168.254.108" },
        { name: "Camera 1", ip: "192.168.254.106" },
        { name: "Camera 2", ip: "192.168.254.107" },
        { name: "Camera 3", ip: "192.168.254.108" },
    ];

    useEffect(() => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Groups", link: "/groups" },
            { label: location.group.name, link: "/groups" },
            { label: location.name, link: "/locations/" + location.id },
        ]);
    }, []);


    const handleDetectChange = (detected) => {
        // Only starts scan when detections changes and greater than 0
        // Only starts when a previous scan ends
        // To prevent loop call to BACKEND
        if (
            detected > 0 &&
            !isScanning
        ) {
            // handleScan(); // Start detection and recognition
        }
    };

    const renderCameras = () => {
        return (
            cameras.map((camera, index) => {
                return (
                    <CameraItem
                        key={index}
                        camera={camera}
                    />
                )
            })
        );
    };

    return (
        <MainContainer>
            <div className='location-cameras-container'>
                <div className='location-header-area'>
                    <MainBreadcrumbs />
                </div>
                <div className='location-cameras-area custom-scrollbar-hidden'>
                    <div
                        className='cameras-container  custom-scrollbar-hidden'
                        style={{ height: `${gridDims.height}px` }}
                    >
                        <FeedsActionBar />
                        <div className='fs-5 fw-bold mt-3 unselectable'>Cameras</div>
                        {renderCameras()}
                    </div>
                </div>
                <div className='location-live-area custom-scrollbar-hidden' >
                    <div className={`feeds-grid ${GRIDS[grid].name} `}>
                        <WebcamFeed
                            videoRef={videoRef}
                            onDetectChange={(detected) => handleDetectChange(detected)}
                        />
                        {renderEmptySlots()}
                    </div>
                </div>
                <div className='location-list-area custom-scrollbar-hidden'>
                    <div
                        className='list-container'
                        style={{ height: `${gridDims.height}px` }}
                    >
                        <div className='fs-5 fw-bold unselectable'>Detections</div>
                        <AttendanceList />
                    </div>
                </div>
            </div>
        </MainContainer>
    );
}

export default LocationPage;
