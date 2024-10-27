import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

import { FaVideo } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaRectangleList } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaMapLocation } from "react-icons/fa6";

import { useSidebar } from '../../hooks/useSidebar';
import { useRecognize } from '../../hooks/useRecognize';
import { useAuth } from '../../hooks/useAuth';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

const MainSidebar = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { collapse } = useSidebar();

    return (
        <ProSidebar className='sidebar-area' collapsed={collapse}>
            <SidebarContent>
                <SidebarHeader>
                    <Menu>
                        <MenuItem icon={<MdDashboardCustomize size={25} />}>
                            <Link to="/dashboard">Dashboard</Link>
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <Menu>
                    <MenuItem icon={<FaUserGroup size={25} />}><Link to="/groups">Groups</Link></MenuItem>
                    <MenuItem icon={<FaMapLocation size={22} />} ><Link to="/locations">Locations</Link></MenuItem>
                    <MenuItem icon={<FaRectangleList size={25} />} >Records</MenuItem>
                    <MenuItem icon={<IoSettingsSharp size={25} />}>Settings</MenuItem>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}

export default MainSidebar;
