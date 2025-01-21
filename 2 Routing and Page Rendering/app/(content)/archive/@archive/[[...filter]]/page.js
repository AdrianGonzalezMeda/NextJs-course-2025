import NewsList from "@/components/news-list";
import {
    getAvailableNewsMonths,
    getAvailableNewsYears,
    getNewsForYear,
    getNewsForYearAndMonth
} from "@/lib/news";
import Link from 'next/link'

// "Catch all route": This catches any route that matches the /archive/* pattern.
// The parameter value will be an array that will contain the captured segments. The @archive parallel path
// it will not have the page.js file because it conflicts with the page.js file of our "catch all" route
const FilteredNewsPage = ({ params }) => {
    const filter = params.filter;
    const selectedYear = filter?.[0]; // shortcut: filter ? filter[0] : undefined
    const selectedMonth = filter?.[1];
    let news;
    let newsContent = <p>No news found for the selected period</p>
    let links = getAvailableNewsYears();

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);
    }

    if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    // Validate path segments
    if ((selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
        (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))) { // cast to number
            throw new Error('Invalid filter.');
    }

    return (
        <>
            <header id="archive-header">
                <nav>
                    <ul>
                        {links.map(link => {
                            const href = selectedYear
                                ? `/archive/${selectedYear}/${link}`
                                : `/archive/${link}`;

                            return <li key={link}>
                                <Link href={href}>{link}</Link>
                            </li>
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </>
    )
}

export default FilteredNewsPage