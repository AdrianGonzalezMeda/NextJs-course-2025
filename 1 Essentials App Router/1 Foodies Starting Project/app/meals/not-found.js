// Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)

const NotFound = () => {
    return (
        <main className="not-found">
            <h1>Meal not found</h1>
            <p>Unfortunately, we could not find the requested page or meal.</p>
        </main>
    )
}

export default NotFound
