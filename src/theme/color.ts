interface ColorObject {
  [key: string]: string | ColorObject
}

// TODO: fix theme autocomplete?
// HSL: hue (degree), saturation (%), lightness (%)
const base_colors: ColorObject = {
  primary: "0, 0, 0",
  alert: "3, 100, 46",
}

const stringToHSL = (colorString: string) => {
  const [hue, saturation, lightness] = colorString.split(", ")
  return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`
}

const colorObjectToHSL = (object: ColorObject): ColorObject => {
  return Object.entries(object).reduce((acc: ColorObject, [key, value]) => {
    if (typeof value === "string") {
      acc[key] = stringToHSL(value)
    } else {
      acc[key] = colorObjectToHSL(value)
    }
    return acc
  }, {})
}

export const color = colorObjectToHSL(base_colors)
