import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import axios from 'axios';
import { transferPlayback, togglePlayBack } from 'utils/spotifyutils.js'
import { playNextTrack, playPreviousTrack, getCurrentPlayback, getCurrentTrack} from './utils/spotifyutils.js';

//TODO: Error 403 intermittently occurs after page initially loads, when toggling play. Doesn't appear to be due to accessToken + deviceID not ready
export default function Player({_accessToken, _refreshToken, _expiresIn}) {

    const [{ isPlaying, currentTrack }, dispatch] = useStore();
    const [volume, setVolume] = useState(null);
    const accessToken = useToken(_accessToken, _refreshToken, _expiresIn);
    const deviceID = useWebPlayer(accessToken);

    useEffect(async () => {
        if (!deviceID) return;
        await transferPlayback(accessToken, deviceID);
        const {device: {volume_percent}} = await getCurrentPlayback(accessToken);
        const {item} = await getCurrentTrack(accessToken);
        dispatch({
            type: "SET_TRACK",
            currentTrack: item
        })
    }, [deviceID])

    const handlePlayButton = async () => {
        if (!accessToken || !deviceID) return;
        else {
            await togglePlayBack(accessToken, isPlaying);
            const { progress_ms } = await getCurrentPlayback(accessToken);
            console.log(progress_ms);
            dispatch({
                type: "SET_IS_PLAYING",
                isPlaying: !isPlaying
            })
        }
    }

    const handlePrevSongButton = async () => {
        if (!accessToken || !deviceID) return;
        else {
            await playPreviousTrack(accessToken);
        }
    }

    const handleNextSongButton = async () => {
        if (!accessToken || !deviceID) return;
        else {
            await playNextTrack(accessToken);
        }
    }

    return(
        <div>
            <button id="playButton" onClick={handlePlayButton}>{isPlaying ? "Pause" : "Play"}</button>
            <button id="prevSongButton" onClick={handlePrevSongButton}>Prev</button>
            <button id="nextSongButton" onClick={handleNextSongButton}>Next</button>
            <h1>{volume}</h1>
            <h2>{currentTrack === null ? null : currentTrack.name}</h2>
        </div>
    )
}