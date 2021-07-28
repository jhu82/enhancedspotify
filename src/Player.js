import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import axios from 'axios';
import { transferPlayback} from 'utils/spotifyutils.js'
import { Button, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Player({_accessToken, _refreshToken, _expiresIn}) {

    const [{ isPlaying, currentTrack }, dispatch] = useStore();
    const [volume, setVolume] = useState(50);
    const accessToken = useToken(_accessToken, _refreshToken, _expiresIn);
    const [deviceID, player] = useWebPlayer(accessToken);
    const [playlists, setPlaylists] = useState();

    useEffect(async () => {
        if (!deviceID || !player) return;
        const response = await transferPlayback(accessToken, deviceID);
        console.log(response);
        const initialVolume = await player.getVolume();
        setVolume(initialVolume * 100);
        const {track_window: {current_track}} = await player.getCurrentState();
        dispatch({
            type: "SET_TRACK",
            currentTrack: current_track
        })
        player.addListener('player_state_changed', state => {
            console.log(state);
            dispatch({
                type: "SET_TRACK",
                currentTrack: state.track_window.current_track
            })
            dispatch({
                type: "SET_IS_PLAYING",
                isPlaying: !state.paused
            })
        })
    }, [deviceID, player])

    useEffect(async () => {
        if (!player) return;
        player.setVolume(volume / 100);
    }, [volume, player])

    const handlePlayButton = async () => {
        if (!accessToken || !deviceID || !player) return;
        else {
            await player.togglePlay()
        }
    };

    const handlePrevSongButton = async () => {
        if (!accessToken || !deviceID || !player) return;
        else {
            const state = await player.getCurrentState()
            if (state.position >= 2000 || state.track_window.previous_tracks.length === 0) {
                player.seek(0);
            } else {
                player.previousTrack();
            }
        }
    };

    const handleNextSongButton = async () => {
        if (!accessToken || !deviceID || !player) return;
        else {
            await player.nextTrack();
        }
    };

    const useStyles = makeStyles({
        root: {
            width: 200
        }
    })

    const classes = useStyles();

    const handleVolumeSliderChange = (event, newValue) => {
        setVolume(newValue);
    }

    return(
        <div className={classes.root}>
            <Button color="primary" id="playButton" onClick={handlePlayButton}>{isPlaying ? "Pause" : "Play"}</Button>
            <Button color="primary" id="prevSongButton" onClick={handlePrevSongButton}>Prev</Button>
            <Button color="primary" id="nextSongButton" onClick={handleNextSongButton}>Next</Button>
            <Slider 
                value={volume}
                onChange={handleVolumeSliderChange}
                aria-labelledby="volume-slider"
            />
            <h1>{volume}</h1>
            <h2>{currentTrack === null ? null : currentTrack.name}</h2>
            <img src={currentTrack === null ? null: currentTrack.album.images[0].url} />
        </div>
    )
}