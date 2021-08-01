import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


export default function VolumeButton({volume, onClick}) {
    return (
        <IconButton onClick={onClick}>
            {volume === 0 ? <VolumeMuteIcon /> : <VolumeUpIcon /> }
        </IconButton>
    )
}