import React from 'react';
import {useState, useEffect} from 'react';
import TrackSlider from './TrackSlider';
import { msToMinutes } from 'utils/spotifyutils'
import './TrackControl.css'

export default function TrackControl({player, trackDuration, isPlaying, deviceReady}) {
    const [trackPosition, setTrackPosition] = useState(0);
    const [seekPosition, setSeekPosition] = useState(0);
    const [isTrackProgress, setIsTrackProgress] = useState(true);
    const [trackInterval, setTrackInterval] = useState();

    useEffect(async () => {
        if (!deviceReady || !player) return;
        if (isPlaying) {
            const interval = setInterval(async () => {
                const { position } = await player.getCurrentState();
                if (position !== null) setTrackPosition(position);
            }, 500)
            setTrackInterval(interval);
        } else {
            clearInterval(trackInterval);
            const { position } = await player.getCurrentState();
            if (position !== null) setTrackPosition(position);
        }
        return () => clearInterval(trackInterval);
    }, [trackDuration, isPlaying])

    const handleTrackSliderChange = (event, newValue) => {
        setSeekPosition(newValue);
        setIsTrackProgress(false);
    }

    const handleTrackSliderCommit = async (event, newValue) => {
         await player.seek(newValue);
         setTrackPosition(newValue);
         setIsTrackProgress(true);
    }

    return (
        <div className="track-control">
            <p>{msToMinutes(isTrackProgress ? trackPosition : seekPosition)}</p>
            <TrackSlider 
                position={isTrackProgress ? trackPosition : seekPosition}
                trackDuration={trackDuration}
                onChange={handleTrackSliderChange}
                onChangeCommitted={handleTrackSliderCommit}
            />
            <p>{msToMinutes(trackDuration)}</p>
        </div>
    )
}