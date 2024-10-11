import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ text, onClick}) => {
    const navigate = useNavigate();

    return (
        <div className='back-button' onClick={() => {onClick()}}>
            <IoMdArrowRoundBack size={19} />
            <span className='fs-6 ms-1'>{text}</span>
        </div>
    )
}

export default BackButton;