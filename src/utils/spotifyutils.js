//Creating a central utility file, for wrapper functions to Spotify API calls. To improve readability and ease of maintenance, while seprating from component code.
//TODO: For all "get" functions, simplify to a single function with a keyword to map to the specific URL. Although need to weigh tradeoff of just directly calling axios
import axios from 'axios';

const API_URL = "https://api.spotify.com/v1"

export const transferPlayback = async (accessToken, deviceID) => {
    const url = API_URL + "/me/player";
    try {
        const response = await axios.put(url, {device_ids: [deviceID]}, {headers: {Authorization: `Bearer ${accessToken}`}});
        return response;
    } catch(e) {
        console.log(e);
    }
}

export const getUserInfo = async (accessToken) => {

}

export const getUserPlaylists = async (accessToken) => {
    const url = API_URL + "/me/playlists";
    try {
        const { data } = await axios.get(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        return data;
    } catch(e) {
        console.log(e);
    }
}

export const playSong = (accessToken, songURI) => {
    
}