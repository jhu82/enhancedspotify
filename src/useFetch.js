import React, { useState, useEffect } from 'react';
import { useStore } from './store/SpotifyContextStore';
import axios from 'axios';

export default function useFetch(url, params) {
    const [{accessToken}] = useStore(null);
    const [response, setResponse] = useState(null);
    useEffect(async () => {
        if (!accessToken) return;
        const { data } = await axios.get(url, 
                                    {
                                        params: params,
                                        headers: {Authorization: `Bearer ${accessToken}`}
                                    })
        setResponse(data);
        console.log("yes");
    }, [accessToken, url])

    return response;
}
