import React, { useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

import { MdDashboardCustomize } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaRectangleList } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { useSidebar } from '../../hooks/useSidebar';
import { useRecognize } from '../../hooks/useRecognize';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

const MainSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();
    const { isScanning } = useRecognize();
    const {
        collapse,
        toggleCollapse,
        activePage,
        handleClick,
        PAGES,
        isNarrow,
    } = useSidebar();

    useEffect(() => {
        handleClick(location.pathname.slice(1));
    }, []);

    const SquareLogo = () => {
        return (
            <div className='logo-div'>
                <img
                    src={"/images/resight2.png"}
                    alt={`resight logo`}
                />
            </div>
        )
    };

    const isHidden = (isNarrow && collapse) ? 'hidden' : (isNarrow) ? 'visible' : '';

    return (
        <ProSidebar
            collapsed={collapse}
            className={`sidebar-area unselectable ${isHidden}`}
        >
            <SidebarHeader onClick={toggleCollapse}>
                <Menu style={{ margin: '27px 0' }}>
                    <MenuItem
                        icon={<SquareLogo />}
                    >
                        <span className='logo-text'>SQUARE</span>
                    </MenuItem>
                    {isNarrow && (
                        <IoClose size={30} style={{ position: 'absolute', top: '10px', right: '10px' }} />
                    )}
                </Menu>
            </SidebarHeader>
            <SidebarContent>
                <Menu>
                    <MenuItem
                        className={`${(activePage === PAGES.DASHBOARD) ? 'active' : ''}`}
                        onClick={() => handleClick(PAGES.DASHBOARD)}
                        icon={<MdDashboardCustomize size={25} />}
                    ><Link to="/dashboard">Dashboard</Link></MenuItem>
                    <MenuItem
                        className={`${(activePage === PAGES.GROUPS) ? 'active' : ''}`}
                        onClick={() => handleClick(PAGES.GROUPS)}
                        icon={<FaUserGroup size={25} />}
                    ><Link to="/groups">Groups</Link></MenuItem>
                    <MenuItem
                        className={`${(activePage === PAGES.LOCATIONS) ? 'active' : ''}`}
                        onClick={() => handleClick(PAGES.LOCATIONS)}
                        icon={<FaMapLocation size={22} />}
                    ><Link to="/locations">Locations</Link></MenuItem>
                    <MenuItem
                        className={`${(activePage === PAGES.ACTIVITY) ? 'active' : ''}`}
                        onClick={() => handleClick(PAGES.ACTIVITY)}
                        icon={<FaRectangleList size={25} />}
                    ><Link to="/activity">Activity</Link></MenuItem>
                    <MenuItem
                        className={`${(activePage === PAGES.SETTINGS) ? 'active' : ''}`}
                        onClick={() => handleClick(PAGES.SETTINGS)}
                        icon={<IoSettingsSharp size={25} />}
                    ><Link to="/settings">Settings</Link></MenuItem>
                </Menu>
            </SidebarContent>
            {!collapse && (
                <SidebarFooter>
                    <Menu>
                        <MenuItem
                            icon={<FiLogOut size={25} />}
                            onClick={() => {
                                if (!isScanning) {
                                    logout().then(() => {
                                        navigate('/', { replace: true })
                                    });
                                }
                            }}
                        >
                            {(isScanning) ? 'Still Scanning...' : 'Logout'}
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            )}
        </ProSidebar>
    );
}

export default MainSidebar;
