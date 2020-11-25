import { ThemeWrapper } from "../theme/ThemeWrapper"

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const MyApp = ({ Component, pageProps }) => (
  <>
    <ThemeWrapper>
      <Component {...pageProps} />
    </ThemeWrapper>
  </>
)

export default MyApp
