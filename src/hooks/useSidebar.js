import { createContext, useContext, useMemo, useEffect, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [collapse, setCollapse] = useState(true);
    
    const value = useMemo(
        () => ({
            setCollapse,
            collapse
        }),
        [collapse]
    );
    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};