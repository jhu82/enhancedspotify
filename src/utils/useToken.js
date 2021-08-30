import { useEffect } from 'react';
import { useStore } from '../store/SpotifyContextStore.js';
import axios from 'axios';

export default function useToken(initialAccessToken, refreshToken, expiresIn) {

    const [{ accessToken }, dispatch] = useStore();

    useEffect(() => {
        //Set accesstoken to inital accessToken if we are currently in intial state
        if (!accessToken) {
            dispatch({
                type: "SET_TOKEN",
                accessToken: initialAccessToken
            });
        }
        //If accessToken already exists, start the timer to get new refresh token right before expiration
        else {
            const timer = setTimeout(() => {
                axios.post("http://localhost:8000/refresh",
                {
                    refresh_token: refreshToken
                })
                .then(res => {
                    dispatch({
                        type: "SET_TOKEN",
                        accessToken: res.data.access_token
                    })
                })
                .catch(e => {
                    window.location = "/";
                });
            }, (expiresIn - 100) * 1000)
            return () => clearTimeout(timer);
        }
    }, [accessToken]);
    return accessToken;
}

