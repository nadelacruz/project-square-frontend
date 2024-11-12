import React from 'react';


const AnalyticsItem = ({ analytics }) => {

    return (
        <div className='group-analytics-item ' onClick={() => { }}>
            <div
                className='opacity-75 text-truncate'
                style={{ fontSize: '11px' }}
            >Analytics</div>
            <div
                className='fw-bold text-truncate'
            >{analytics.name}</div>
        </div>
    )
}

export default AnalyticsItem;