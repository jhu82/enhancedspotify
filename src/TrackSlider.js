import React from 'react';
import { Slider } from '@material-ui/core';
import { msToMinutes } from 'utils/spotifyutils'

export default function TrackSlider({position, trackDuration, onChange, onChangeCommitted}) {
    return (
        <div>
            <h1>{msToMinutes(position)}</h1>
            <Slider
                value = {position}
                max = {trackDuration}
                onChange = {onChange}
                onChangeCommitted = {onChangeCommitted}
                aria-labelledby = "track-slider" 
            />
            <h1>{msToMinutes(trackDuration)}</h1>
        </div>
    )
}