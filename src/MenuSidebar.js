import React from 'react';
import styles from './MenuSidebar.module.css';
import UserPlaylists from './UserPlaylists';
import spotifyLogo from './assets/spotifylogo.png';
import MenuItem from './MenuItem';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';
import HistoryIcon from '@material-ui/icons/History';


export default function MenuSidebar({accessToken}) {
    return (
        <div className={styles['menu-sidebar']}>
            <img className={styles['spotify-logo']}
                 src={spotifyLogo}
                 alt="Spotify Icon" 
            />
            <div className={styles['menu-icons']}>
                <MenuItem linkTo="/" icon={<HomeOutlinedIcon />} text="Home" />
                <MenuItem linkTo="/search" icon={<SearchIcon />} text="Search" />
                <MenuItem linkTo="/saved" icon={<FavoriteBorderOutlinedIcon />} text="Liked Songs" />
                <MenuItem linkTo="/toptracks" icon={<ShowChartOutlinedIcon />} text="Top Tracks" />
                <MenuItem linkTo="/recent" icon={<HistoryIcon />} text="Recently Played" />
            </div>
            <UserPlaylists accessToken={accessToken} />
        </div>
    )
}