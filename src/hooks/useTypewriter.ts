import { useEffect, useState } from 'react'

/** 打字机效果：逐字输出，打完后停留再删除重打 */
export function useTypewriter(text: string, speed = 55, pauseMs = 2600) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    setDisplay('')
    let i = 0
    let timer: ReturnType<typeof setTimeout>

    const type = () => {
      i += 1
      setDisplay(text.slice(0, i))
      if (i < text.length) {
        timer = setTimeout(type, speed)
      } else {
        timer = setTimeout(erase, pauseMs)
      }
    }
    const erase = () => {
      i -= 1
      setDisplay(text.slice(0, i))
      if (i > 0) {
        timer = setTimeout(erase, 22)
      } else {
        timer = setTimeout(type, 500)
      }
    }

    timer = setTimeout(type, 600)
    return () => clearTimeout(timer)
  }, [text, speed, pauseMs])

  return display
}
