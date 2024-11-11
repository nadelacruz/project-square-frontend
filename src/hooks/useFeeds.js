import { createContext, useContext, useMemo, useState } from "react";

import { FaSquare } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";

const FeedsContext = createContext();

const ICON_SIZE = 25;

const GRIDS = [
    { name: "one", icon: <FaSquare size={ICON_SIZE} /> },
    { name: "two", icon: <IoGrid size={ICON_SIZE} /> },
    { name: "three", icon: <BsGrid3X3GapFill size={ICON_SIZE} /> },
];

export const FeedsProvider = ({ children }) => {

    const [state, setState] = useState({
        gridDims: { width: 0, height: 0 },
        grid: 0
    });

    const { grid, gridDims } = state;

    const updateState = (newState) => {
        setState(prevState => ({ ...prevState, ...newState }));
    };

    const onGridChangeClick = () => {
        if (grid === GRIDS.length - 1) {
            updateState({ grid: 0 });
        } else {
            updateState({ grid: grid + 1 });
        }
    };

    const renderEmptySlots = () => {
        const side = grid + 1;
        const emptySlots = [];
        for (let i = 0; i < (side * side) - 1; i++) {
            emptySlots.push(
                <div key={i} className="video-feed" style={{ background: 'var(--page-header-color)' }}>
                    No camera
                </div> // Make empty camera slot component that can Handle drop
            );
        }
        return emptySlots;
    };


    const value = useMemo(
        () => ({
            gridDims,
            grid,
            updateState,
            GRIDS,
            ICON_SIZE,
            onGridChangeClick,
            renderEmptySlots
        }),
        [state]
    );
    return <FeedsContext.Provider value={value}>{children}</FeedsContext.Provider>;
};

export const useFeeds = () => {
    return useContext(FeedsContext);
};