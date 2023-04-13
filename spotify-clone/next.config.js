/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
                pathname: "/image/*"
            },
            {
                protocol: "https",
                hostname: "platform-lookaside.fbsbx.com"
            },
            {
                protocol: "https",
                hostname: "mosaic.scdn.co"
            },
            {
                protocol: "https",
                hostname: "t.scdn.co"
            }
        ]
    }
}

module.exports = nextConfig
