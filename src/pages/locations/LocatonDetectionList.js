import React from "react";

import AttendanceList from "../../components/lists/AttendanceList";

import { useFeeds } from "../../hooks/useFeeds";

const LocationDetectionList = () => {
    const {
        gridDims,
    } = useFeeds();

    const DetectionTypes = ({ type }) => {
        return (
            <div className="detection-type">
                {type}
            </div>
        )
    }

    return (
        <>
            <div
                className='list-container custom-scrollbar-hidden'
                style={{ height: `${gridDims.height}px` }}
            >
                <div className="list-container-header">
                    <div className='fw-bold unselectable mb-2'>Detections</div>
                    <div className="detection-types-flex">
                        <DetectionTypes type="All" />
                        <DetectionTypes type="Inbound" />
                        <DetectionTypes type="Outbound" />
                        <DetectionTypes type="Unknown" />
                    </div>
                </div>
                <div style={{padding: '1rem'}}>
                    <AttendanceList />
                </div>
                <div className="list-container-footer-fade" />
            </div>
        </>
    )
}

export default LocationDetectionList;