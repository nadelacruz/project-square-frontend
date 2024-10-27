import { createContext, useContext, useMemo, useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

const BreadcrumbsContext = createContext();


export const BreadcrumbsProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [breadcrumbs, setBreadcrumbs] = useState([
        { label: 'Groups', link: '/groups' }
    ]);

    useEffect(() => {
        const parts = location.pathname.split("/").filter(Boolean);

        if (parts.length === 1) {
            clearBreadcrumbs();
            addBreadcrumb(capitalizeFirst(parts[0]), "/" + parts[0])
        }
    }, [location.pathname]);

    const capitalizeFirst = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const addBreadcrumb = (label, link) => {
        setBreadcrumbs(prevBreadcrumbs => [
            ...prevBreadcrumbs,
            { label: label, link: link }
        ]);
    };

    const onBreadcrumbClick = (index, link) => {
        const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
        setBreadcrumbs(newBreadcrumbs);
        navigate(link);
    }

    const onBackClick = () => {
        if (breadcrumbs.length > 1) {
            const newBreadcrumbs = breadcrumbs.slice(0, -1);
            setBreadcrumbs(newBreadcrumbs);
            navigate(breadcrumbs[breadcrumbs.length - 2].link);
        }
    }

    const clearBreadcrumbs = () => {
        setBreadcrumbs([]);
    }

    const value = useMemo(
        () => ({
            breadcrumbs,
            setBreadcrumbs,
            addBreadcrumb,
            onBreadcrumbClick,
            onBackClick,
            clearBreadcrumbs
        }),
        [breadcrumbs]
    );
    return <BreadcrumbsContext.Provider value={value}>{children}</BreadcrumbsContext.Provider>;
};

export const useBreadcrumbs = () => {
    return useContext(BreadcrumbsContext);
};