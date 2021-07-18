import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayerSDK from './useWebPlayerSDK';
import axios from 'axios';

export default function Player(props) {

    const accessToken = useToken(props.accessToken, 
                                 props.refreshToken, 
                                 props.expiresIn);

    const deviceID = useWebPlayerSDK(accessToken);

    useEffect(() => {
        if (!deviceID) return;
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        console.log(headers);
        axios.put("https://api.spotify.com/v1/me/player", { 
            device_ids: [deviceID],
            play: true
        }, {headers: headers})
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e)
            })
    }, [deviceID])

    return(
        <div>Hello Spotify {accessToken} 
        <button>Yeah ok</button>
        </div>
    )
}