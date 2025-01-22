// Example of Server-side data Fetching

import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

// Example of Client-side data Fetching
export default async function NewsPage() {
    /**
     * Example fetching from a separated Backend 
    const response = await fetch('http://localhost:8080/news');

    if (!response.ok) {
        throw new Error('Failed to fetch news.')
    }

    const news = await response.json();
    */

    // Example fetching directly from BBDD 
    const news = await getAllNews();

    return (
        <>
            <h1>News Page</h1>
            <NewsList news={news} />
        </>
    );
}


// Example of Client-side data Fetching
/*"use client";

import { useEffect, useState } from 'react';

import NewsList from '@/components/news-list';

export default function NewsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        async function fetchNews() {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/news');

            if (!response.ok) {
                setError('Failed to fetch news.');
                setIsLoading(false);
            }

            const news = await response.json();
            setIsLoading(false);
            setNews(news);
        }

        fetchNews();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    let newsContent;

    if (news) {
        newsContent = <NewsList news={news} />
    }

    return (
        <>
            <h1>News Page</h1>
            {newsContent}
        </>
    );
}
*/