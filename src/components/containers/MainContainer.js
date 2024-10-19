import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MainHeader from '../headers/MainHeader';
import MainSidebar from '../sidebars/MainSidebar';

const MainContainer = ({children}) => {

    return (
        <div className="main-container">
            <ToastContainer />
            <MainHeader />
            <MainSidebar />

            <div className='content-area custom-scrollbar'>
                {children}
            </div>
        </div>
    )
}

export default MainContainer;