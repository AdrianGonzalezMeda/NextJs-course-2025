'use client' // error.js pages must be an client component, to catch both server and client errors

// Next js hide the error to prevent showing to final clients, but you can get error code or another custom data 
// atached to the error
const Error = ({ error }) => {
    return (
        <div className="error">
            <h1>An error occurred!</h1>
            <p>Failed to create meal</p>
        </div>
    )
}

export default Error
