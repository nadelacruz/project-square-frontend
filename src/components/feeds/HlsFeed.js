import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsFeed = ({ streamUrl }) => {
    const videoRef = useRef(null);
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // setIsLoaded(true); // Set loaded state when HLS manifest is parsed
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // For Safari
            videoRef.current.src = streamUrl;
            videoRef.current.addEventListener('loadedmetadata', () => {
                // setIsLoaded(true);
            });
        }
    }, [streamUrl]);

    return (
        <div>
            <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default HlsFeed;
