/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@amcharts/amcharts5'],
    images: {
      domains: ['bafybeib7fxmbekofel42x4mjn3zdtxh6p6jbhhogywtizrf37fzkjubz3m.ipfs.nftstorage.link',
                'bafybeifs45zuxyqhhw35enaz23cr6mh5stjx3k6xcimpd3wsufzdnw44eq.ipfs.nftstorage.link',
                'bitcoin-maximalists.s3.amazonaws.com']
    }
  }
  
  module.exports = nextConfig