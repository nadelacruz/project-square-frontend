import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

import { FaVideo } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineChecklist } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const ListenerSidebar = () => {
    const navigate = useNavigate();

    const [collapse, setCollapse] = useState(true);

    return (
        <ProSidebar className='sidebar-area' collapsed={collapse}>
            <SidebarContent>
                <SidebarHeader>
                    <Menu>
                        <MenuItem onClick={() => { setCollapse(!collapse) }} icon={<TiThMenu size={28} />}>
                            <span className='explore-text'>MENU</span>
                        </MenuItem>
                    </Menu>
                </SidebarHeader>
                <Menu >
                    <MenuItem icon={<FaVideo size={22} />}>Live Attendance</MenuItem>
                    <MenuItem icon={<MdDashboardCustomize size={25} />}>Dashboard</MenuItem>
                    <MenuItem icon={<FaUserGroup size={25} />}>Groups</MenuItem>
                    <MenuItem icon={<MdOutlineChecklist size={25} />}>Records</MenuItem>
                    <MenuItem icon={<IoSettingsSharp size={25} />}>Settings</MenuItem>
                    {/* <MenuItem icon={<FaVideo size={22} />}><Link to="/">Live Attendance</Link></MenuItem>
                    <MenuItem icon={<FaClipboardList size={25} />}><Link to="/">Records</Link></MenuItem> */}
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}

export default ListenerSidebar;
