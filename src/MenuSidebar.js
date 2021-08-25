import React from 'react';
import styles from './MenuSidebar.module.css';
import UserPlaylists from './UserPlaylists.js';
import spotifyLogo from './assets/spotifylogo.png';
import MenuItem from './MenuItem.js';
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
                <MenuItem linkTo="/" icon={<SearchIcon />} text="Search" />
                <MenuItem linkTo="/" icon={<FavoriteBorderOutlinedIcon />} text="Liked Songs" />
                <MenuItem linkTo="/" icon={<ShowChartOutlinedIcon />} text="Top Tracks" />
                <MenuItem linkTo="/" icon={<HistoryIcon />} text="Recently Played" />
            </div>
            <UserPlaylists accessToken={accessToken} />
        </div>
    )
}