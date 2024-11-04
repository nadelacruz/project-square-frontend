import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import IdentityInfo from './IdentityInfo';
import IdentityFace from './IdentityFace';

const IdentityPage = ({ content }) => {

    useEffect(() => {
        // Ask confirmation from user when reloading page
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";  
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className='identity-setup-container'>
            <ToastContainer />
            <div className='step-main-container'>
                {content === "info" && (<IdentityInfo />)}
                {content === "face" && (<IdentityFace />)}
                {content === "verify" && (<IdentityInfo />)}
                {content === "finish" && (<IdentityInfo />)}
            </div>
        </div>
    );
};

export default IdentityPage;
