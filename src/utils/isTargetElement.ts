import { INPUT_ELEMENTS } from './elements'

export function isInputTarget(event: Event): boolean {
  return isTargetElement(event, INPUT_ELEMENTS)
}

export default function isTargetElement(
  event: Event,
  elements: string[]
): boolean {
  const target = event.target as HTMLElement
  return elements.some((elm) => !!target.closest(elm))
}
