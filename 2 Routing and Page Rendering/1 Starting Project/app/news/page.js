import Link from "next/link"

const NewsPage = () => {
    return (
        <>
            <h1>News</h1>
            
            <ul className='news-list'>
                <li>
                    <Link href='/news/abc'>Abc</Link>
                </li>
                <li>
                    <Link href='/news/abcd'>Abcd</Link>
                </li>
            </ul>
        </>
    )
}

export default NewsPage
