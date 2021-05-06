import { theme } from "../src/theme"

type CustomTheme = typeof theme

// Allow IDE object completion on the theme object within styled components
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends CustomTheme {}
}
