import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useToken(accessToken, refreshToken, expiresIn) {

    const [newAccessToken, setNewAccessToken] = useState(accessToken);

    useEffect(() => {
        if (!expiresIn || !accessToken) return;
        const timer = setTimeout(() => {
            axios.post("http://localhost:8000/refresh",
            {
                refresh_token: refreshToken
            })
            .then(res => {
                setNewAccessToken(res.data.access_token);
            })
            .catch(e => {
                window.location = "/";
            });
        }, 50000)
    }, [newAccessToken]);

    return newAccessToken;
}
