/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/recuperar-senha',
        destination: '/password/recovery',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
