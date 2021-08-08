import React from 'react';
import { Slider } from '@material-ui/core';

export default function TrackSlider({position, trackDuration, onChange, onChangeCommitted}) {
    return (
            <Slider
                value = {position}
                max = {trackDuration}
                onChange = {onChange}
                onChangeCommitted = {onChangeCommitted}
                aria-labelledby = "track-slider" 
            />
    )
}