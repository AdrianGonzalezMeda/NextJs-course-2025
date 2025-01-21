import '../globals.css';

export const metadata = {
    title: 'Next.js Page Routing & Rendering',
    description: 'Learn how to route to different pages.',
}

// Route Groups: you can group routes and set a diferent layout for them justs by grouping in separated 
// folders named by () around the name EJ: (marketing)
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
