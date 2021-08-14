import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore.js';
import { transferPlayback} from 'utils/spotifyutils.js';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './Footer';
import LyricsSidebar from './LyricsSidebar';
import MenuSidebar from './MenuSidebar';
import styles from './Dashboard.module.css';

export default function Dashboard({_accessToken, _refreshToken, _expiresIn}) {

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
        <ThemeProvider theme={theme}>
            <div id={styles['dashboard']}> 
                <MenuSidebar />
                <LyricsSidebar currentTrack={currentTrack} />
                <Footer player={player} 
                        deviceReady={deviceReady} 
                        currentTrack={currentTrack}
                        isPlaying={isPlaying}
                />
            </div>
        </ThemeProvider>
    )
}