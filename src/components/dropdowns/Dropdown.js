import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ children, icon, title }) => {

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            } 
        };
        
        document.addEventListener('click', handleClick, true);
        return () => {
            document.removeEventListener('click', handleClick, true);
        };

    }, []);

    const handleClick = (e) => {
        if (isOpen) e.stopPropagation();
        setIsOpen(!isOpen) ;
    }
    


    const dropdownIcon = document.querySelector(`.${title}-icon`);
    var distanceFromRight;
    if (dropdownIcon) {
        distanceFromRight = window.innerWidth - (dropdownIcon.offsetLeft + dropdownIcon.offsetWidth);
    }
    return (
        <div className={`${title}`}>
            <div className={`header-icons ${title}-icon`}  title={title} onClick={handleClick}>
                {icon}
            </div>
            {(isOpen) && (
                <div
                    ref={ref}
                    className='icon-dropdown box-shadow custom-scrollbar inside-dropdown'
                    style={{
                        right: `${distanceFromRight}px`
                    }}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;