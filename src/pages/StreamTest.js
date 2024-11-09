import React from 'react';
import HlsFeed from '../components/feeds/HlsFeed';


const StreamTest = () => {

    return (
        <div className="main-container" >

            <HlsFeed streamUrl={"http://localhost:5000/stream"} />
        </div>
    );
}

export default StreamTest;
