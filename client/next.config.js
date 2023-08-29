module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://api.flexhire.com/api/:path*',
          },
        ]
      },
  };