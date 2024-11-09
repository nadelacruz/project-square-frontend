import React from 'react';

import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ text, onClick}) => {
    return (
        <div className='back-button' onClick={() => {onClick()}}>
            <IoMdArrowRoundBack size={19} />
            <span className='fs-6 ms-1'>{text}</span>
        </div>
    )
}

export default BackButton;