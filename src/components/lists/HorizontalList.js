import React, { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

const HorizontalList = ({children }) => {
    const listRef = useRef();

    const { events } = useDraggable(listRef);

    return (
        <div className='group-horizontal-list' {...events} ref={listRef}>
            {children}
        </div>
    );
}

export default HorizontalList;
