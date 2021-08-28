//Creating a central utility file, for wrapper functions to Spotify API calls. To improve readability and ease of maintenance, while seprating from component code.
//TODO: For all "get" functions, simplify to a single function with a keyword to map to the specific URL. Although need to weigh tradeoff of just directly calling axios
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

export const playTrack = async (accessToken, context, offset) => {
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

export const getPlaylistsFromCategory = async (accessToken, category, limit) => {
    const url = API_URL + `/browse/categories/${category}/playlists`;
    try {
        const { data } = await axios.get(url,
                        {
                            params: {limit: limit},
                            headers: {Authorization: `Bearer ${accessToken}`}
                        });
        return data.items;
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

export const stringToLocaleDate = (string, locale) => {
    try {
        return new Date(string).toLocaleDateString(locale);
    } catch (e) {
        console.log("Invalid String input");
    }
}