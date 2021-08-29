import React from 'react';
import Login from "./Login.js";
import Dashboard from "./Dashboard";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Route } from 'react-router-dom';

const accessToken = new URLSearchParams(window.location.search).get('access_token');
const refreshToken = new URLSearchParams(window.location.search).get('refresh_token');
const expiresIn = new URLSearchParams(window.location.search).get('expires_in');

const theme = createTheme({
    palette: {
        primary: {
            main: '#b3b3b3'
        },
        secondary: {
            main: '#ffffff'
        },
    }
})

export default function App() {
    return(
        <ThemeProvider theme={theme}>
            <Route path="/">
            { (accessToken && refreshToken && expiresIn) ? <Dashboard 
                                                                _accessToken = {accessToken} 
                                                                _refreshToken = {refreshToken} 
                                                                _expiresIn = {expiresIn} 
                                                            /> 
                                                            : <Login /> }
            </Route>
        </ThemeProvider>
    )
}