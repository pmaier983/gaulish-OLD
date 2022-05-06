const hslFromString = (hslString: string): [number, number, number] => {
  console.log(hslString)
  return hslString
    .split(",")
    .map((section) => parseInt(section.replace(/\D/g, ""), 10)) as [
    number,
    number,
    number
  ]
}

const numbersToHsl = (hue: number, saturation: number, lightness: number) =>
  `hsl(${hue}deg, ${saturation}%, ${lightness}%)`

const hsl_add_hue = ({ color, amount }: { color: string; amount: number }) => {
  const [hue, saturation, lightness] = hslFromString(color)
  const newHue = Math.max(Math.min(hue + amount, 100), 0)
  return numbersToHsl(newHue, saturation, lightness)
}

const hsl_add_saturation = ({
  color,
  amount,
}: {
  color: string
  amount: number
}) => {
  const [hue, saturation, lightness] = hslFromString(color)
  const newSaturation = Math.max(Math.min(saturation + amount, 100), 0)
  return numbersToHsl(hue, newSaturation, lightness)
}

const hsl_add_lightness = ({
  color,
  amount,
}: {
  color: string
  amount: number
}) => {
  const [hue, saturation, lightness] = hslFromString(color)
  const newLightness = Math.max(Math.min(lightness + amount, 100), 0)
  return numbersToHsl(hue, saturation, newLightness)
}

// HSL: hue (degree), saturation (%), lightness (%)
const colors = {
  primary: "hsl(0deg, 0%, 0%)",
  alert: "hsl(3deg, 100%, 46%)",
  brown: "hsl(18deg, 38%, 34%)",
  green: "hsl(131deg, 55%, 29%)",
  red: "hsl(357deg, 73%, 50%)",
  grey: "hsl(46deg, 1%, 68%)",
  blue: "hsl(214deg, 35%, 37%)",
  goGreen: "hsl(148deg, 92%, 40%)",
  stopRed: "hsl(359deg, 92%, 40%)",
  hsl_add_hue,
  hsl_add_saturation,
  hsl_add_lightness,
}

export { colors }
