import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MainHeader from '../headers/MainHeader';
import MainSidebar from '../sidebars/MainSidebar';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';

import { useGroup } from '../../hooks/useGroup';

const MainContainer = ({ children }) => {
    const { 
        showCreateGroup, 
        showJoinGroup, 
        toggleCreateGroup,
        toggleJoinGroup,
    } = useGroup();

    useEffect(() => {
        const content = document.querySelector('.content-area');

        if (content) {
            const observer = new ResizeObserver(entries => {
                requestAnimationFrame(() => {
                    for (let entry of entries) {
                        const width = entry.contentRect.width;
    
                        content.classList.remove('medium', 'narrow');
    
                        if (width < 950) {
                            content.classList.add('narrow');
                        } else if (width < 1400) {
                            content.classList.add('medium');
                        }
                    }
                });
            });
    
            observer.observe(content);
    
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div className="main-container">
            <CreateGroupModal
                show={showCreateGroup}
                onClose={toggleCreateGroup}
            />

            <JoinGroupModal
                show={showJoinGroup}
                onClose={toggleJoinGroup}
            />

            <ToastContainer limit={1} />
            
            <MainSidebar />

            <div className='content-area custom-scrollbar'>
                {children}
            </div>
        </div>
    )
}

export default MainContainer;