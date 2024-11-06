import { createContext, useContext, useMemo, useEffect, useState } from "react";

const SidebarContext = createContext();

const PAGES = {
    DASHBOARD: 'dashboard',
    GROUPS: 'groups',
    LOCATIONS: 'locations',
    ACTIVITY: 'activity',
    SETTINGS: 'settings',
}

export const SidebarProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(true);
    const [activePage, setActivePage] = useState('');
    const [isNarrow, setIsNarrow] = useState(false);

    const toggleCollapse = () => setCollapse(!collapse);
    const handleClick = (page) => {
        setActivePage(page)
        if (isNarrow) toggleCollapse();
    };

    const value = useMemo(
        () => ({
            collapse,
            toggleCollapse,
            activePage,
            handleClick,
            PAGES,
            isNarrow,
            setIsNarrow
        }),
        [collapse, activePage, isNarrow]
    );
    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};