declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      REACT_APP_CLOUDFRONT_DISTRIBUTION_ID: string
      REACT_APP_S3_BUCKET_NAME: string
      REACT_APP_AWS_ACCOUNT_NUMBER: string
      REACT_APP_AWS_REGION: string
      REACT_APP_RDS_USER: string
      REACT_APP_RDS_HOST: string
      REACT_APP_RDS_DATABASE: string
      REACT_APP_RDS_PASSWORD: string
      REACT_APP_RDS_PORT: string
      REACT_APP_GRAPHQL_PORT: string
      REACT_APP_DOCKER_WORKDIR: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
