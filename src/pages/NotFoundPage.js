import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../components/containers/MainContainer';

const NotFoundPage = ({ content }) => {
    const navigate = useNavigate();

    const NotFound = ({ redirectText, redirectLink, redirectHint }) => {
        return (
            <>
                <img src='/svg/oops-404-error-with-a-broken-robot-animate.svg' />
                <button
                    className='main-button mb-5'
                    onClick={() => navigate(redirectLink)}
                    title={redirectHint}
                >
                    {redirectText}
                </button>
                <a
                    className='small text-dark'
                    style={{ textDecoration: 'none' }}
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
                <div className='not-found-container fade-in'>
                    <img src='/svg/404-error-animate.svg' />
                    <div className='fs-3 mb-2' style={{ fontWeight: '600' }}>Group does not exist.</div>
                    <button
                        className='main-button mb-5'
                        onClick={() => navigate('/groups')}
                        title="Groups Page"
                    >
                        Go back
                    </button>
                    <a
                        className='small text-dark'
                        style={{ textDecoration: 'none' }}
                        href="https://storyset.com/web"
                    >Web illustrations by Storyset</a>
                </div>
            )}
        </>
    );
}

export default NotFoundPage;
