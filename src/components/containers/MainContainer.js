import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MainHeader from '../headers/MainHeader';
import MainSidebar from '../sidebars/MainSidebar';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';

import { useGroup } from '../../hooks/useGroup';

const MainContainer = ({ children }) => {
    const { showCreate, showJoin, updateState } = useGroup();

    useEffect(() => {
        const container = document.querySelector('.content-area');

        if (container) {
            const observer = new ResizeObserver(entries => {
                requestAnimationFrame(() => {
                    for (let entry of entries) {
                        const width = entry.contentRect.width;
    
                        container.classList.remove('medium', 'narrow');
    
                        if (width < 950) {
                            container.classList.add('narrow');
                        } else if (width < 1400) {
                            container.classList.add('medium');
                        }
                    }
                });
            });
    
            observer.observe(container);
    
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className="main-container">
            <CreateGroupModal
                show={showCreate}
                onClose={() => { updateState({ showCreate: false }) }}
            />

            <JoinGroupModal
                show={showJoin}
                onClose={() => { updateState({ showJoin: false }) }}
            />


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