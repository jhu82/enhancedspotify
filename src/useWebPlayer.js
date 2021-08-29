import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useWebPlayerSDK(accessToken, refreshToken) {

    const [deviceID, setDeviceID] = useState();
    const [player, setPlayer] = useState();

    const REDIRECT_URL = "http://localhost:8000/login";

    //Load script only on initial mount
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        document.body.appendChild(script);
        window.history.replaceState({}, document.title, "/");
    }, []);

    //Initialize Spotify player instance upon accessToken received
    useEffect(async () => {
        if (!accessToken) return;

        async function waitForSpotifyWebPlaybackSDKToLoad () {
            return new Promise(resolve => {
              if (window.Spotify) {
                resolve(window.Spotify);
              } else {
                window.onSpotifyWebPlaybackSDKReady = () => {
                  resolve(window.Spotify);
                };
              }
            });
          };
        await waitForSpotifyWebPlaybackSDKToLoad();
        const newPlayer = new Spotify.Player({
            name: "My Player",
            getOAuthToken: cb => {
              axios.post("http://localhost:8000/refresh",
              {
                  refresh_token: refreshToken
              })
              .then(
                response =>
                {
                  cb(response.data.access_token);
                })
              .catch(
                e => {
                  console.log(e);
                })
            },
            volume: 0.5
        });

        const errors = ['initialization_error', 'authentication_error', 'account_error', 'playback_error'];
        errors.map(error => {
                newPlayer.on(error, ({message}) => {
                    console.log(message);
                })
            }
        )
        newPlayer.addListener('ready', ({ device_id }) => {
            setDeviceID(device_id);
        });
        newPlayer.connect().then(success => success && setPlayer(newPlayer));
    }, [accessToken])

    return [deviceID, player];

}