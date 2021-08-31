# A Spotify Clone with Added Features

## Description
A Spotify single page application, with the added features of providing lyrics of the currently playing track. Also provides access to some personal playlists,
such as your top tracks of the month as well as the most recently played tracks. Utilizes the Spotify API and Spotify Web SDK for browser playback.

Lyrics are scraped real-time from azlyrics.com. Note that this is not for commercial use. 

![Screen Shot 2021-08-30 at 7 19 18 PM](https://user-images.githubusercontent.com/6644815/131443819-27d3e913-cf24-4cd7-ab8a-455adb8ba03c.png)

Login Page
    
![Screen Shot 2021-08-30 at 7 27 26 PM](https://user-images.githubusercontent.com/6644815/131440549-22f650e1-3d39-4cb9-a724-c61bfb8cc83e.png)

Homepage View

![Screen Shot 2021-08-30 at 8 04 47 PM](https://user-images.githubusercontent.com/6644815/131440580-cc13fd83-6215-47cf-afe9-c966f1962260.png)

Sample Playlist View

## Motivation
As an extensive user of Spotify, one simple but useful feature I had felt was missing is the availability of lyrics as you play the song. Taking advantage of an
extensive API from Spotify, I tried to recreate most of the key features of the web application with the added benefit of viewing lyrics real time. As part of the 
learning experience, I avoided using existing npm packages for integrating with Spotify, and worked directly with the Spotify API and SDK. In addition to the lyrics,
I added some additional features such as your trending tracks and recently played, as these were also features that were useful, and were available within the API library.


## Architecture
The application uses the following technologies and packages:

**React**: For a fast and response library for SPA Front-End.

**React Router**: Viewing multiple pages on the dashboard.

**Material-UI**: Premade components and icons, mostly for playback footer.

**Nodejs with Express**: Back-end server for authentication and webscraping.

**Cheerio**: Webscraping package.

**Axios**: Library for making API calls to server and Spotify API endpoints.

Styling is done with CSS Modules for ease of management per component, without the risk of running into conflicts as with Global CSS.

State management is done with React Context with useReduce to avoid prop drilling down the component tree.

Composibility is emphasized, in particular in when components share similar structure, to encourage reusability and to avoid repeating code. 
For example, PlaylistView, TopTrackView, LikedView, etc all share similar layout but with slight differences in how the data is fetched and displayed. 
Because of this, these components all compose TableView. 

## Authentication

Spotify API uses OAuth2 for authentication, which provides an access token to make API calls. For the authentication flow, one that provides a refresh
token was selected, as an access token expires within an hour. With a refresh token provided, the access token can be refreshed prior to its expiration.

A backend is set up to handle authorization calls in order to hide the API Keys from the public. Both the Spotify Web SDK and Spotify API needs an accessToken.

![](https://developer.spotify.com/assets/AuthG_AuthoriztionCode.png)

## Features

1. Ability to transfer playback once app initializes, provided user has used Spotify in other devices.
2. Can pause, play, fast forward, rewind. Track slider used to track song progress as well as to allow playback at a certain point of the song.
3. Volume bar with ability to mute and unmute.
4. Display lyrics on sidebar, that changes along with the current track.
5. Multiple views:\
    -HomeView: display trending categories and playlists, from which user can access upon clicking.\
    -PlaylistView: display all tracks in particular playlist. Can change playback upon selecting the song.\
    -SearchView: can search for any particular track, and play back from the results.\
    -LikedView: displays songs liked by user\
    -TopTracksView: display trending and most played song within the most recent 4 week period.


## Demo
[Demo Here](https://www.youtube.com/watch?v=8FEpgTdSGag&ab_channel=JinmingHu)

![2021-08-30 19 47 30](https://user-images.githubusercontent.com/6644815/131443643-9bbbb4d1-7717-4f91-a2ec-05a53b656630.gif)

## Installation

Clone the project onto your local machine.

From ./client 

npm install\
npm start

From ./server

npm install\
nodemon server.js

Go to localhost:8080 to access the application.

Do note that a .env will need to be setup within the /server directory, with the following format.

CLIENT_ID=[YOUR ID]\
CLIENT_SECRET=[YOUR CLIENT SECRET]\
SCOPE=user-read-private, user-read-email, streaming, user-modify-playback-state, user-read-playback-state, playlist-read-private, user-top-read, user-library-read, user-read-recently-played

To get a Client ID + Client Secret, [this page can be referenced for more info.](https://developer.spotify.com/documentation/general/guides/app-settings/)

## Future Improvements

1. Look for alternatives to webscraping as this might not be ideal in a production environment, in order to depend on a 3rd party site. Musixmatch
looks to be a great library but many features are gated under premium usage.
2. Add infinite scrolling to large playlists. 
3. Add artist/album view. 
4. Handle podcasts, with the ability to add transcriptions instead of lyrics on the sidebar.
5. Add media queries to support mobile view



 
