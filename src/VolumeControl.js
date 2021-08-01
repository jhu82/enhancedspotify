import React from 'react';
import { useState, useEffect } from 'react';
import VolumeButton from './VolumeButton';
import VolumeSlider from './VolumeSlider';

export default function VolumeControl({player, deviceReady}) {

    const [volume, setVolume] = useState(50);
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(50);

    //Handle setting volume via VolumeSlider and toggling mute via VolumeButton
    useEffect(() => {
        if (!player || !deviceReady) return;
        player.setVolume(volume / 100);
    }, [volume, deviceReady])

    const handleVolumeSliderChange = (event, newValue) => {
        setVolume(newValue);
    }
    // Store current volume prior to muting, which is returned when the volume is unmuted.
    // setVolumeBeforeMute will always set current volume, not 0 since state updates
    // are batched in event handlers.
    const handleVolumeButtonClick = () => {
        if (volume > 0) {
            setVolumeBeforeMute(volume);
            setVolume(0);
        } else {
            setVolume(volumeBeforeMute);
        }
    }

    return (
        <div>
            <VolumeButton volume={volume} onClick={handleVolumeButtonClick} />
            <VolumeSlider volume={volume} onChange={handleVolumeSliderChange} />
        </div>
    )
}