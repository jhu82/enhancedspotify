import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import SkipNextIcon from '@material-ui/icons/SkipNext';

export default function NextSongButton({ onClick }) {
    return(
        <IconButton onClick={onClick}>
            <SkipNextIcon fontSize="medium" color="primary" />
        </IconButton>
    )
}