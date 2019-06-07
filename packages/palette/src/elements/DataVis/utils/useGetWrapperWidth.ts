import { useEffect, useState } from "react"

/**
 * Returns width of container element
 * @param ref reference to wrapper component
 */
export const useGetWrapperWidth = (ref: React.RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0)
  const [widthCheckInterval, setWidthCheckInterval] = useState(null)

  useEffect(() => {
    const setContainerWidth = () => {
      if (ref.current) {
        setWidth(ref.current.getBoundingClientRect().width - 5)
      }
    }

    setContainerWidth()

    setWidthCheckInterval(setInterval(setContainerWidth, 500))

    window.addEventListener("resize", setContainerWidth)

    return function cleanup() {
      window.removeEventListener("resize", setContainerWidth)
      clearInterval(widthCheckInterval)
    }
  }, [])

  return width
}