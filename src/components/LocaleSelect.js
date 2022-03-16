import { useLocale, useSetLocale } from 'contexts/LocaleContext'
import React from 'react'
import styled from 'styled-components'

const LocaleSelect = () => {
  const local = useLocale()
  const setLocal = useSetLocale()

  const handleChange = (e) => setLocal(e.target.value)
  return (
    <Select value={local} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </Select>
  )
}

export default LocaleSelect

const Select = styled.select`
  color: #585858;
  background-color: #f2f2f2;
  padding: 0 3px;
  border: 9px solid #f2f2f2;
  border-radius: 5px;
  margin-left: 17px;
  outline: none;
`
