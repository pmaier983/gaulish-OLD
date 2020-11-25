/* eslint-disable @typescript-eslint/no-var-requires */
// Allow bundle analyzer to work
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({})
