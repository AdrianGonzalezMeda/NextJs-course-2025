// Route Handlers

export function GET(request) {
    console.log(request);

    // return Response.json();
    return new Response('Hello!');
}

// Route Handlers are HTTP methods
// export function POST() { ... }
// export function PUT() { ... }
// export function DELETE() { ... }