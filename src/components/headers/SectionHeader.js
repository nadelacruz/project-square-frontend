import React from 'react';

const SectionHeader = ({ icon, title, actions }) => {
    return (
        <div className='section-header' id={title}>
            <div className='d-flex align-items-center'>
                {icon}
                <span className='fw-bold text-truncate'>{title}</span>
            </div>
            <div  className='d-flex align-items-center'>
                {actions}
            </div>
        </div>
    );
};

export default SectionHeader;