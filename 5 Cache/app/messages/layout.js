import { getMessages } from "@/lib/messages";

export default async function MessagesLayout({ children }) {

    /*
    * Example with separated backend
    const response = await fetch('http://localhost:8080/messages', {
        headers: {
            'X-ID': 'layout',
        },
    });
    const messages = await response.json();
    */

    // Example with BBDD
    const messages = await getMessages();
    const totalMessages = messages.length;

    return (
        <>
            <h1>Important Messages</h1>
            <p>{totalMessages} messages found</p>
            <hr />
            {children}
        </>
    );
}
