import React from 'react';
import MainSidebar from '../sidebars/MainSidebar';

// import { useSidebar } from '../../hooks/useSidebar';

const ContentContainer = ({ children, header}) => {
    // const { setIsNarrow } = useSidebar();

    return (
        <div className="content-container">
            <div className='content-header-area'>
                {header}
            </div>
            <div className='content-content-area'>
                {children}
            </div>
        </div>
    )
}

export default ContentContainer;