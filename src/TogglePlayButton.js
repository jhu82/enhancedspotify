import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

export default function TogglePlayButton({isPlaying, onClick}) {
    return(
        <IconButton onClick={onClick}>
            {isPlaying ? <PauseCircleFilledIcon fontSize="large" /> : <PlayCircleFilledIcon fontSize="large" />}
        </IconButton>
    )
} 