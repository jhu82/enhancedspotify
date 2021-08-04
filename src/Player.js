import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import { transferPlayback} from 'utils/spotifyutils.js'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core'
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
        if (!deviceID || !player) return;
        const {status} = await transferPlayback(accessToken, deviceID);
        if (status === 204) {
            setDeviceReady(true);
        }
        player.addListener('player_state_changed', state => {
            if (state !== null) {
                dispatch({
                    type: "SET_TRACK",
                    currentTrack: state.track_window.current_track
                })
                dispatch({
                    type: "SET_IS_PLAYING",
                    isPlaying: !state.paused
                })
            }
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

    const useStyles = makeStyles({
        root: {
            width: "100%",
            height: 75,
            background: 'white'
        }
    })

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid container direction="row" justifyContent="center" item xs={2}>
                    <Grid item>
                        <img src={currentTrack && currentTrack.album.images[0].url} height="100" />
                    </Grid>
                    <Grid item>
                        <Typography align="center">
                            {currentTrack && currentTrack.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" item xs={8}>
                    <PreviousSongButton onClick={handlePrevSongButton} />
                    <TogglePlayButton isPlaying={isPlaying} onClick={handleTogglePlayButton} />
                    <NextSongButton onClick={handleNextSongButton} />
                    <TrackControl 
                        player={player}
                        isPlaying={isPlaying}
                        trackDuration={currentTrack && currentTrack.duration_ms}
                        deviceReady={deviceReady}
                    />
                </Grid>
                <Grid container item justifyContent="center" alignItems="center" xs={2}>
                    <VolumeControl player={player} deviceReady={deviceReady} />
                </Grid>
            </Grid>
        </div>
    )
}