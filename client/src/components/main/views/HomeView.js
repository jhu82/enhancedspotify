import React from 'react';
import useFetch from '../../../utils/useFetch';
import CardRow from '../CardRow';

export default function HomeView() {

    const URL = "https://api.spotify.com/v1/browse/categories";
    const { categories } = useFetch(URL, {limit: 10, country: "US", locale: "en_US" }) || {};

    return (
        <div>
            {categories && categories.items.map(category => <CardRow key={category.id} 
                                                                     category={category.id} 
                                                                     name={category.name} 
                                                            />)}
        </div>
    )
}