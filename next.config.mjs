/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // 기존에 SVG 파일을 처리하는 로더를 가져옵니다.
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // ?url로 끝나는 SVG 파일은 기존의 파일 로더 규칙을 재적용합니다.
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 나머지 *.svg 파일은 React 컴포넌트로 변환합니다.
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // *.svg?url 제외
        use: ["@svgr/webpack"],
      }
    );

    // 이제 SVG 파일을 파일 로더에서 제외합니다.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
