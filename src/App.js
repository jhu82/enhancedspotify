import React from 'react';
import ReactDOM from 'react-dom';
import Login from "./Login.js";
import Lyrics from "./Lyrics.js";
import Player from "./Player.js";

const accessToken = new URLSearchParams(window.location.search).get('access_token');
const refreshToken = new URLSearchParams(window.location.search).get('refresh_token');
const expiresIn = new URLSearchParams(window.location.search).get('expires_in');

export default function App() {
    return(
        <div>
        { (accessToken && refreshToken && expiresIn) ? <Player _accessToken = {accessToken} 
                                                               _refreshToken = {refreshToken} 
                                                               _expiresIn = {expiresIn} /> 
                                                     : <Login /> }
        </div>
    )
}