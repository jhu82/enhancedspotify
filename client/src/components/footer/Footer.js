import React from 'react';
import PreviousSongButton from './PreviousSongButton';
import TogglePlayButton from './TogglePlayButton';
import NextSongButton from './NextSongButton';
import VolumeControl from './VolumeControl';
import TrackControl from './TrackControl';
import TrackMainInfo from './TrackMainInfo';
import styles from './Footer.module.css';

export default function Footer({player, deviceReady, currentTrack, isPlaying}) {

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

    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-left']}>
                <TrackMainInfo 
                    imgSRC={currentTrack && currentTrack.album.images[0].url}
                    trackName={currentTrack && currentTrack.name}
                    artists={currentTrack && currentTrack.artists.map(artist => artist.name).join(", ")}
                />
            </div>
            <div className={styles['footer-center']}>
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
            <div className={styles['footer-right']}>
                <VolumeControl player={player} deviceReady={deviceReady} />
            </div>
        </footer>
    )
}