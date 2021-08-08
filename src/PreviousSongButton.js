import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

export default function PreviousSongButton({ onClick }) {
    return(
        <IconButton onClick={onClick}>
            <SkipPreviousIcon fontSize="medium" color="primary" />
        </IconButton>
    )
}