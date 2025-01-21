'use client'
// Intercepting routes: https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
import { notFound, useRouter } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

export default function InterceptedImagePage({ params }) {
    const router = useRouter(); // Navigate programatically
    const newsItemSlug = params.slug;
    const newsItem = DUMMY_NEWS.find(
        (newsItem) => newsItem.slug === newsItemSlug
    );

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <div className="modal-backdrop" onClick={router.back} />
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </div>
            </dialog>
        </>
    );
}
