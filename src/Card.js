import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ id, img, name }) {
    return (
        <Link to={`/playlists/${id}`}>
            <div>
                <img src={img} />
                <p>{name}</p>
            </div>
        </Link>
    )
}