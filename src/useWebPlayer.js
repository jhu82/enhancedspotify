import React, { useState, useEffect } from 'react';

export default function useWebPlayerSDK(accessToken) {

    const [deviceID, setDeviceID] = useState();
    const [player, setPlayer] = useState();

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

    //Initialize Spotify player instance upon accessToken received
    //Todo: add additional listeners to handle potential errors
    useEffect(() => {
        if (!accessToken) return;
        
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const newPlayer = new Spotify.Player({
                name: "My Player",
                getOAuthToken: cb => {cb(accessToken)},
                volume: 0.5
            });
            //Add listener for each error and redirects user to front page if issue is encountered
            //Todo: Add error handling page?
            const errors = ['initialization_error', 'authentication_error', 'account_error', 'playback_error'];
            errors.map(error => {
                    newPlayer.on(error, ({message}) => {
                        console.log(message);
                        //window.location = '/';
                    })
                }
            )
            newPlayer.addListener('ready', ({ device_id }) => {
                setDeviceID(device_id);
            });
            newPlayer.connect().then(success => success && setPlayer(newPlayer));
        }
    }, [accessToken])

    return [deviceID, player];

}