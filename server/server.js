const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const cheerio = require('cheerio');
const axios = require('axios');
const qs = require('qs');

require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const scope = process.env.SCOPE;
const redirect_uri = 'http://localhost:8000/callback'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/login', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
    }));
})

//TODO: convert to try-catch block for consistency
app.get('/callback', async(req, res) => {
    const code = req.query.code || null;
    const form = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
    }
    const headers = {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let access_token, expires_in, refresh_token;

    await axios.post('https://accounts.spotify.com/api/token', qs.stringify(form), {headers: headers})
        .then(response => {
            access_token = response.data.access_token;
            expires_in = response.data.expires_in;
            refresh_token = response.data.refresh_token;
            console.log(access_token);
        })
        .catch(err => {
            console.log(err)
        })

    res.redirect('http://localhost:8080/?' + 
        querystring.stringify({
            access_token: access_token,
            expires_in: expires_in,
            refresh_token: refresh_token
    }))
})

//TODO: convert to try-catch block for consistency
app.post('/refresh', async(req, res) => {
    const refresh_token = req.body.refresh_token;    
    const form = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
    }
    const headers = {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    let access_token, expires_in;

    await axios.post('https://accounts.spotify.com/api/token', qs.stringify(form), {headers: headers})
        .then(response => {
            access_token = response.data.access_token;
            expires_in = response.data.expires_in;
        })
        .catch(err => {
            console.log(err);
        })
    res.json({
        access_token: access_token,
        expires_in: expires_in
    })
})


app.post('/lyrics', async(req, res) => {
    let artist_query = req.body.artist.toLowerCase();
    let song_query = req.body.song.toLowerCase();

    //Case: Artist name begins with "The ", need to eliminate from beginning of artist query.
    if (artist_query.startsWith('the ')) {
        artist_query = artist_query.substring(4);
    }
    //Case: Song name contains (feat...) or (with...), need to eliminate the substring from the song query.
    if (song_query.search(/\(feat|\(with/) !== -1) {
        const index = song_query.search(/\(feat|\(with/);
        song_query = song_query.substring(0, index);
    }
    //Eliminate whitespace and other non alphanumeric values from artist and song names
    artist_query = artist_query.replace(/[^0-9a-z]/gi, '');
    song_query = song_query.replace(/[^0-9a-z]/gi, '');
    try {
        const url = `https://www.azlyrics.com/lyrics/${artist_query}/${song_query}.html`;
        const { data } = await axios.get(url);
        const $ = await cheerio.load(data);
        res.send($('div.container.main-page div:not([class])').html());
    } catch(e) {
        res.send('Lyrics not available.')
    }
})

app.listen(8000);