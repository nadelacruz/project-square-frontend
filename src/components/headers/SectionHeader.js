import React from 'react';

const SectionHeader = ({ icon, title, actions }) => {
    return (
        <div className='section-header' id={title}>
            <div className='d-flex align-items-center'>
                {icon}
                <span className='fs-5 fw-bold'>{title}</span>
            </div>
            <div>
                {actions}
            </div>
        </div>
    );
};

export default SectionHeader;