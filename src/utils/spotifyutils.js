//Creating a central utility file, for wrapper functions to Spotify API calls. To improve readability and ease of maintenance, while seprating from component code.
import axios from 'axios';

const API_URL = "https://api.spotify.com/v1"

export const transferPlayback = async (accessToken, deviceID) => {
    const url = API_URL + "/me/player";
    try {
        const response = await axios.put(url, 
                                        {device_ids: [deviceID]}, 
                                        {headers: {Authorization: `Bearer ${accessToken}`}
                                        });
        return response;
    } catch(e) {
        console.log(e);
    }
}

export const playTrackFromContext = async (accessToken, context, offset) => {
    const url = API_URL + "/me/player/play";
    try {
        await axios.put(url, 
                        {
                         context_uri: context,
                         offset: {
                             position: offset
                        }},
                        {headers: {Authorization: `Bearer ${accessToken}`}
                        });
    } catch(e) {
        console.log(e);
    }
}

export const playTrackFromURI = async (accessToken, URIs, offset) => {
    const url = API_URL + "/me/player/play";
    try {
        await axios.put(url, 
                        {
                         uris: URIs,
                         offset: {
                             position: offset
                        }},
                        {headers: {Authorization: `Bearer ${accessToken}`}
                        });
    } catch(e) {
        console.log(e);
    }
}

export const search = async (accessToken, query, type) => {
    const url = API_URL + 
                "/search?q=" + 
                query +
                `&type=${type}`;
    try {
        const res = await axios.get(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

//convert ms into track time format, M:SS
export const msToMinutes = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

//convert UTC to readable locale format, MM/DD/YYYY
export const stringToLocaleDate = (string, locale) => {
    try {
        return new Date(string).toLocaleDateString(locale);
    } catch (e) {
        console.log("Invalid String input");
    }
}