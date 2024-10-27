import React, {useEffect} from 'react';

import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

import { IoMdArrowRoundBack } from "react-icons/io";

const MainBreadcrumbs = () => {
    const {onBreadcrumbClick, onBackClick, breadcrumbs} = useBreadcrumbs();

    return (
        <div className='breadcrumbs-container'>
            <IoMdArrowRoundBack size={25} className='cursor-pointer me-3' onClick={() => onBackClick()}/>
            {breadcrumbs.map((breadcrumb, index) => {
                return (
                    <div
                        className={`breadcrumb-text`}
                        key={index}
                        onClick={() => onBreadcrumbClick(index, breadcrumb.link)}
                    >
                        <div className= {(index !== 0)? 'me-2' : ''}> {(index !== 0)? '/' : ''}</div>
                        <div className={`label ${(index === breadcrumbs.length - 1)? 'active' : ''}`}> {breadcrumb.label}</div>
                    </div>
                );
            })}
        </div>
    )
};

export default MainBreadcrumbs;
