import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

export default function Lyrics(props) {
    const [searchText, setSearchText] = useState("");
    const [songQuery, setSongQuery] = useState("");
    const [lyrics, setLyrics] = useState("");

    useEffect(() => {
        const query = {
            artist: songQuery.split(" ")[0],
            song: songQuery.split(" ")[1]
        }
        axios.post('http://localhost:8000/search', query)
             .then(response => setLyrics(response.data))
             .catch(e => console.log(e));
    }, [songQuery]);

    return (
        <div>
        <form id="searchBar" onSubmit={e => {
                setSongQuery(searchText);
                e.preventDefault();
            }}>
            <label>
                <input name="searchbar"
                       type="text" 
                       value={ searchText } 
                       onChange={e => setSearchText(e.target.value)} />
            </label>
            <button type="submit" form="searchBar" value="Submit">Submit</button>
            <h1>{ songQuery }</h1>
            <div>{ parse(lyrics) }</div>
        </form>
        </div>
    )
}