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

//TO-DO: Add error handling
app.post('/search', async(req, res) => {
    const url = `https://www.azlyrics.com/lyrics/${req.body.artist}/${req.body.song}.html`;
    const { data } = await axios.get(url);
    const $ = await cheerio.load(data);
    console.log($.html());
    res.send($.html());
})

app.listen(8000);