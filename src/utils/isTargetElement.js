import { INPUT_ELEMENTS } from './elements'

const isTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.target.closest(elm))
}

export const isRelatedTargetElement = (event, elements) => {
  return elements.some((elm) => !!event.relatedTarget?.closest(elm))
}

export const isInputTarget = (event) => {
  return isTargetElement(event, INPUT_ELEMENTS)
}

export default isTargetElement
