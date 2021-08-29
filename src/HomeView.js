import React from 'react';
import useFetch from './useFetch';
import CardRow from './CardRow';

export default function HomeView() {

    const URL = "https://api.spotify.com/v1/browse/categories";
    const { categories } = useFetch(URL, {limit: 10, country: "US", locale: "en_US" }) || {};
    return (
        <div>
            {categories && categories.items.map(category => <CardRow category={category.id} name={category.name} /> )}
        </div>
    )
}