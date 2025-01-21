// When you try to access to /archive/2024, NextJs try to find a page.js at the same deep of the route,
// but in this route doesn't make sense have a dinamic route like [year] so we can create a default.js page
// this contains the default content when one of the parallel routes did not find a fitting page for the path.
// Important: all the parallel routes there are shown on the same page do support all the different paths you
// want to support there, this is way NextJs allows to use default.js

import NewsList from '@/components/news-list'
import { getLatestNews } from '@/lib/news'

const LatestNewsPage = () => {
    const latestNews = getLatestNews();

    return <>
        <h2>Latest news</h2>
        <NewsList news={latestNews} />
    </>
}

export default LatestNewsPage
