import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

import { MdDashboardCustomize } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaRectangleList } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

import { useSidebar } from '../../hooks/useSidebar';
import { useRecognize } from '../../hooks/useRecognize';
import { useAuth } from '../../hooks/useAuth';

const MainSidebar = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { collapse, setCollapse } = useSidebar();

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

    return (
        <ProSidebar className='sidebar-area unselectable' collapsed={collapse}>
            <SidebarHeader onClick={() => { setCollapse(!collapse) }}>
                <Menu style={{ marginBottom: '30px' }}>
                    <MenuItem icon={<SquareLogo />}>
                        <span className='logo-text'>SQUARE</span>
                    </MenuItem>
                </Menu>
            </SidebarHeader>
            <SidebarContent style={{ height: "100%" }}>
                <Menu>
                    <MenuItem icon={<MdDashboardCustomize size={25} />}><Link to="/dashboard">Dashboard</Link></MenuItem>
                    <MenuItem icon={<FaUserGroup size={25} />}><Link to="/groups">Groups</Link></MenuItem>
                    <MenuItem icon={<FaMapLocation size={22} />} ><Link to="/locations">Locations</Link></MenuItem>
                    <MenuItem icon={<FaRectangleList size={25} />} >Records</MenuItem>
                    <MenuItem icon={<IoSettingsSharp size={25} />}>Settings</MenuItem>
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
