import React from 'react';
import { Slider, Grid, Typography } from '@material-ui/core';
import { msToMinutes } from 'utils/spotifyutils'

export default function TrackSlider({position, trackDuration, onChange, onChangeCommitted}) {
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={1}>
                <Typography align="right">
                    {msToMinutes(position)}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Slider
                    value = {position}
                    max = {trackDuration}
                    onChange = {onChange}
                    onChangeCommitted = {onChangeCommitted}
                    aria-labelledby = "track-slider" 
                />
            </Grid>
            <Grid item xs={1}>
                <Typography align="left">
                    {msToMinutes(trackDuration)}
                </Typography>
            </Grid>
        </Grid>
    )
}