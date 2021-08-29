import React from 'react';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import useWebPlayer from './useWebPlayer';
import { useStore } from './store/SpotifyContextStore';
import { transferPlayback} from 'utils/spotifyutils';
import Footer from './Footer';
import LyricsSidebar from './LyricsSidebar';
import MenuSidebar from './MenuSidebar';
import MainView from './MainView';
import styles from './Dashboard.module.css';
import { BrowserRouter as Router } from 'react-router-dom';

export default function Dashboard({_accessToken, _refreshToken, _expiresIn}) {

    const [{ isPlaying, currentTrack }, dispatch] = useStore();
    const accessToken = useToken(_accessToken, _refreshToken, _expiresIn);
    const [deviceID, player] = useWebPlayer(accessToken, _refreshToken);
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

    return(
        <div className={styles['dashboard']}>
            <Router>
                <MenuSidebar accessToken={accessToken} />
                <MainView accessToken={accessToken} />
            </Router> 
            <LyricsSidebar trackURI={currentTrack && currentTrack.uri}  
                            artist={currentTrack && currentTrack.artists[0].name}
                            trackName={currentTrack && currentTrack.name}
            />
            <Footer player={player} 
                    deviceReady={deviceReady} 
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
            />
        </div>
    )
}