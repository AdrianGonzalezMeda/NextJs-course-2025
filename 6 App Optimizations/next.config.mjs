/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [ // To allow using external urls in Image components 
            { hostname: 'res.cloudinary.com' },
        ] 
    }
};

export default nextConfig;
