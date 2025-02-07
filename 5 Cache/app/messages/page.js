import { unstable_noStore } from 'next/cache';
import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

// This const aplies for all the requests in the component
// export const revalidate = 5; //same as next: { revalidate: 5 } on fetch function
// export const dynamic: 'force-dynamic'; // same as cache: 'no-store' DOC: https://nextjs.org/docs/app/building-your-application/caching#segment-config-options

// DOC: https://nextjs.org/docs/app/building-your-application/caching
export default async function MessagesPage() {
    // unstable_noStore(); // Its like using the const revalidate or dynamic to avoid cache, but its recomended to use this way

    /* 
    * Example avoid cache on external requests
    const response = await fetch('http://localhost:8080/messages', { // NextJs overrides fetch function to add some functionality like cache or next options 
        headers: {
            'X-ID': 'page',
        },
        // Cache Options for fetch added by NextJs
        // cache: 'force-cache', // By default on NextJs 14, in NextJs 15 is 'no-store'
        
        next: {
            tags: ['msg'] // This is for revalidate by revalidateTag(). This tag will connect to cached data  
            //revalidate: 5 // Revalidate after 5 seconds
        }
    });
    const messages = await response.json();
    */

    // Example to avoid cache on internal request, such a BBDD request
    // This way does not have de duplicated request cache, so we can do it manually
    const messages = await getMessages();

    if (!messages || messages.length === 0) {
        return <p>No messages found</p>;
    }

    return <Messages messages={messages} />;
}
