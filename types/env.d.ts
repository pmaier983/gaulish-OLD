declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SNOWPACK_PUBLIC_ENABLE_FEATURE: string

      SNOWPACK_PUBLIC_CLOUDFRONT_DISTRIBUTION_ID: string
      SNOWPACK_PUBLIC_S3_BUCKET_NAME: string
      SNOWPACK_PUBLIC_AWS_ACCOUNT_NUMBER: string
      SNOWPACK_PUBLIC_AWS_REGION: string
      SNOWPACK_PUBLIC_API_URL_DOMAIN: string

      NODE_ENV: "development" | "production"

      DOCKER_WORKDIR: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
