import React from 'react';
import useFetch from './useFetch.js';
import CardRow from './CardRow.js';

export default function HomeView() {

    const { categories } = useFetch("https://api.spotify.com/v1/browse/categories", {limit: 10}) || {};
    return (
        <div>
            {categories && categories.items.map(category => <CardRow category={category.id} /> )}
        </div>
    )
}