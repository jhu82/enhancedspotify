import React from 'react';
import { Slider } from '@material-ui/core';

export default function VolumeSlider({ volume, onChange }) {
    return (
        <Slider 
            value={volume}
            onChange={onChange}
            aria-labelledby="volume-slider"
        />
    )
}