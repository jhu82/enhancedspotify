import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import { transferPlayback} from 'utils/spotifyutils.js';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PreviousSongButton from './PreviousSongButton';
import TogglePlayButton from './TogglePlayButton';
import NextSongButton from './NextSongButton';
import VolumeControl from './VolumeControl';
import TrackControl from './TrackControl';
import './Player.css';


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

    const theme = createTheme({
        palette: {
            primary: {
                main: '#b3b3b3'
            },
            secondary: {
                main: '#ffffff'
            }
        }
    })

    return(
        <ThemeProvider theme={theme} >
            <div className="footer">
                <div className="footer-left">
                    <img src={currentTrack && currentTrack.album.images[0].url} height="100" />
                    <div>
                        <h4>{currentTrack && currentTrack.name}</h4>
                        <p>{currentTrack && currentTrack.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                </div>
                <div className="footer-center">
                    <div>
                        <PreviousSongButton onClick={handlePrevSongButton} />
                        <TogglePlayButton isPlaying={isPlaying} onClick={handleTogglePlayButton} />
                        <NextSongButton onClick={handleNextSongButton} />
                    </div>
                    <TrackControl 
                        player={player}
                        isPlaying={isPlaying}
                        trackDuration={currentTrack && currentTrack.duration_ms}
                        deviceReady={deviceReady}
                    />
                </div>
                <div className="footer-right">
                    <VolumeControl player={player} deviceReady={deviceReady} />
                </div>
            </div>
        </ThemeProvider>
    )
}