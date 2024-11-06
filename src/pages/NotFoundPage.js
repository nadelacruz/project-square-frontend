import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../components/containers/MainContainer';

const NotFoundPage = ({ content }) => {
    const navigate = useNavigate();

    const NotFound = ({ redirectText, redirectLink, redirectHint }) => {
        return (
            <>
                <img src='/svg/broken-robot-animate.svg' className='fade-in' />
                <button
                    className='main-button mb-5'
                    onClick={() => navigate(redirectLink)}
                    title={redirectHint}
                >
                    {redirectText}
                </button>
                <a
                    className='small text-white'
                    style={{ textDecoration: 'none', fontWeight: '100' }}
                    href="https://storyset.com/web"
                >Web illustrations by Storyset</a>
            </>
        )
    };

    return (
        <>
            {content === "header" && (
                <MainContainer>
                    <div className='not-found-container fade-in'>
                        <NotFound
                            redirectHint={"Dashboard Page"}
                            redirectText={"Go back"}
                            redirectLink={"/dashboard"}
                        />
                    </div>
                </MainContainer>
            )}
            {content === "noHeader" && (
                <div className='not-found-container fade-in' style={{ height: '100vh' }}>
                    <NotFound
                        redirectHint={"Landing Page"}
                        redirectText={"Go back"}
                        redirectLink={"/"}
                    />
                </div>
            )}
            {content === "noGroup" && (
                <div className='not-found-container fade-in' style={{ color: 'var(--background-light' }}>
                    <img src='/svg/404-error-animate.svg' className='fade-in' />
                    <div className='fs-3 mb-2' style={{ fontWeight: '600' }}>Group does not exist.</div>
                    <button
                        className='main-button mb-5'
                        onClick={() => navigate('/groups')}
                        title="Groups Page"
                    >
                        Go back
                    </button>
                    <a
                        className='small text-white'
                        style={{ textDecoration: 'none', fontWeight: '100' }}
                        href="https://storyset.com/web"
                    >Web illustrations by Storyset</a>
                </div>
            )}
        </>
    );
}

export default NotFoundPage;
