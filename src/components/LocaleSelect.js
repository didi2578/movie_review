import { useLocale, useSetLocale } from 'contexts/LocaleContext'
import React from 'react'

const LocaleSelect = () => {
  const local = useLocale()
  const setLocal = useSetLocale()

  const handleChange = (e) => setLocal(e.target.value)
  return (
    <select value={local} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  )
}

export default LocaleSelect
