import React, { useState, useEffect } from 'react';

export default function useWebPlayerSDK(accessToken) {

    const [deviceID, setDeviceID] = useState();

    //To-do: add additional listeners, add additional error handling
    //To-do: scope out if "accessToken" is necessary for the second useEffect?
    //To-do: add transfer playback here or to a different component?

    //Load script only on initial mount
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        document.body.appendChild(script);
        window.history.replaceState({}, document.title, "/");
    }, []);

    useEffect(() => {
        if (!accessToken) return;
        const initPlayer = () => {
            try {
                const player = new Spotify.Player({
                    name: "My Player",
                    getOAuthToken: cb => {cb(accessToken)}
                });
                player.addListener('ready', ({ device_id }) => {
                    setDeviceID(device_id);
                    console.log('Ready with Device ID', device_id);
                });
                // Connect to the player!
                player.connect().then(success => console.log(success));
            } catch(e) {
                window.location = "/"
            }
        }
        
        if (!window.Spotify) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                initPlayer();
            }
        } else {
            initPlayer();
        }
    }, [accessToken])

    return deviceID;

}