/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "codeit-front.s3.ap-northeast-2.amazonaws.com",
      "codeit-images.codeit.com",
      "codeit-frontend.codeit.com",
      "reactjs.org",
      "assets.vercel.com",
      "tanstack.com",
      "storybook.js.org",
      "testing-library.com",
      "static.cdninstagram.com",
      "s.pstatic.net",
      "ssl.pstatic.net",
      "data1.pokemonkorea.co.kr",
      "jasonwatmore.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
