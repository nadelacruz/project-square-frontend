import React from 'react';
import HlsFeed from '../components/feeds/HlsFeed';
import WebRtcFeed from '../components/feeds/WebRtcFeed';


const StreamTest = () => {

    return (
        <div className="main-container" >
            <WebRtcFeed />
            <HlsFeed streamUrl={"http://localhost:5000/stream"} />
        </div>
    );
}

export default StreamTest;
