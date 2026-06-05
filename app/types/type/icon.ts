import type { iconSide } from "../enum/global/icon"

// export type IconSvgObject = [ elementName: string, attributes: Record<string, any> ][]
export type IconSvgObject = readonly (readonly [string, { readonly [key: string]: string | number }])[];

export type iconProps = {
  side: iconSide,
  hugeicons: IconSvgObject
}