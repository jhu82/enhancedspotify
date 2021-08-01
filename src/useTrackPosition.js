//useTrackPosition: Outputs the current track position of the currently playing track. 
//Activates on change in player instance or track instance. 
//Interval polling for current state only when track is currently playing.

import React from 'react';
import { useState, useEffect } from 'react';

export default function useTrackPosition(player, isPlaying, deviceReady) {

    const [trackPosition, setTrackPosition] = useState(0);

    useEffect(async () => {
        if (!deviceReady || !player) return;
        if (isPlaying) {
            const trackInterval = setInterval(async () => {
            const { position } = await player.getCurrentState();
            setTrackPosition(position);
        }, 500)
            return () => clearInterval(trackInterval);
        }
        else {
            const { position } = await player.getCurrentState();
            setTrackPosition(position);
        }
    }, [deviceReady, isPlaying])

    return trackPosition;

}