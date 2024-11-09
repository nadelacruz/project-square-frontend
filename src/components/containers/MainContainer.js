import React, {useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import MainSidebar from '../sidebars/MainSidebar';

import CreateGroupModal from '../modals/CreateGroupModal';
import JoinGroupModal from '../modals/JoinGroupModal';

import { useGroup } from '../../hooks/useGroup';
import { useSidebar } from '../../hooks/useSidebar';

const MainContainer = ({ children, sidebar = true }) => {
    const { setIsNarrow } = useSidebar();
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
                        setIsNarrow(false);
                        content.classList.remove('medium', 'narrow');

                        if (width < 850) {
                            content.classList.add('narrow');
                            setIsNarrow(true);
                        } else if (width < 1400) {
                            setIsNarrow(false);
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

            {sidebar && (<MainSidebar />)}

            <div className='content-area custom-scrollbar'>
                {children}
            </div>
        </div>
    )
}

export default MainContainer;