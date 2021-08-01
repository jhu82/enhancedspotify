import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import { transferPlayback} from 'utils/spotifyutils.js'
import { makeStyles } from '@material-ui/core/styles';
import PreviousSongButton from './PreviousSongButton';
import TogglePlayButton from './TogglePlayButton';
import NextSongButton from './NextSongButton';
import VolumeControl from './VolumeControl';
import TrackControl from './TrackControl';


export default function Player({_accessToken, _refreshToken, _expiresIn}) {

    const [{ isPlaying, currentTrack }, dispatch] = useStore();
    const accessToken = useToken(_accessToken, _refreshToken, _expiresIn);
    const [deviceID, player] = useWebPlayer(accessToken);
    const [deviceReady, setDeviceReady] = useState(false);

    useEffect(async () => {
        console.log("i am here");
        if (!deviceID || !player) return;
        const {status} = await transferPlayback(accessToken, deviceID);
        if (status === 204) {
            setDeviceReady(true);
        }
        player.addListener('player_state_changed', state => {
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

    const handleTogglePlayButton = async () => {
        if (!deviceReady || !player) return;
        else {
            await player.togglePlay()
        }
    };

    const handlePrevSongButton = async () => {
        if (!deviceReady || !player) return;
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
        if (!deviceReady || !player) return;
        else {
            await player.nextTrack();
        }
    };

    const handleProgressSlider = (event, newValue) => {
        setTrackPosition(newValue);
    }

    const useStyles = makeStyles({
        root: {
            width: 200
        }
    })

    const classes = useStyles();

    return(
        <>
            <PreviousSongButton onClick={handlePrevSongButton} />
            <TogglePlayButton isPlaying={isPlaying} onClick={handleTogglePlayButton} />
            <NextSongButton onClick={handleNextSongButton} />
            <VolumeControl player={player} deviceReady={deviceReady} />
            <TrackControl 
                player={player}
                isPlaying={isPlaying}
                trackDuration={currentTrack === null ? 0 : currentTrack.duration_ms}
                deviceReady={deviceReady}
            />
            <h2>{currentTrack === null ? null : currentTrack.name}</h2>
            <img src={currentTrack === null ? null : currentTrack.album.images[0].url} />
        </>
    )
}