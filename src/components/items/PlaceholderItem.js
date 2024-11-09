import React from 'react';


const PlaceholderItem = ({ aspectRatio }) => {

    return (
        <div className='item-placeholder' style={{aspectRatio: aspectRatio}}>
            {/* <div className='ms-3 d-flex flex-column justify-content-center'>
                <span
                    className='opacity-75 text-truncate'
                    style={{fontSize: '12px'}}
                >Analytics</span>

                <span
                    className='fs-6 fw-bold text-truncate'
                >{analytics.name}</span>
            </div> */}
        </div>
    )
}

export default PlaceholderItem;