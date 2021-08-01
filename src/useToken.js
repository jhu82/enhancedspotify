import React, { useState, useEffect } from 'react';
import { useStore } from './store/SpotifyContextStore.js';
import axios from 'axios';

export default function useToken(initialAccessToken, refreshToken, expiresIn) {

    const [{ accessToken }, dispatch] = useStore();

    //Executes token refresh using expiresIn as countdown timer, to ensure there will be a new access token prior to expiration.
    //TODO: ensure refresh token transfers smoothly in Spotify SDK once expires, and new token is received
    //TODO: callback from SDK might not be working, might need to revalidate

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

