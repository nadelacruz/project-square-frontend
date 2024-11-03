import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../../hooks/useAuth";
import { useRecognize } from '../../hooks/useRecognize';

import { TiThMenu } from "react-icons/ti";

import { useSidebar } from '../../hooks/useSidebar';

const MainHeader = () => {
    const { user, logout } = useAuth();
    const { isScanning } = useRecognize();
    const { setCollapse, collapse } = useSidebar();

    const navigate = useNavigate();


    return (
        <header className='header-area'>
            {(!user) && (
                <div class='justify-content-between'>
                    <Button
                        onClick={() => { navigate('/auth/login') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                            marginRight: '12px ',
                        }}
                    >
                        LOGIN
                    </Button>
                    <Button
                        onClick={() => { navigate('/auth/register') }}
                        style={{
                            backgroundColor: 'var(--primary-color)',
                            fontSize: '15px',
                        }}
                    >
                        REGISTER
                    </Button>
                </div>
            )}
        </header>
    );
}

export default MainHeader;
