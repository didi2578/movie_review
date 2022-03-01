import React, { useEffect, useRef, useState } from 'react'

const FileInput = ({ name, value, onChange, initialPreview }) => {
  const [preview, setPreview] = useState(initialPreview)
  console.log('왜', preview)
  const inputRef = useRef()

  const handleChange = (e) => {
    const nextValue = e.target.files[0]
    onChange(name, nextValue)
  }

  const handleClearClick = () => {
    const inputNode = inputRef.current
    if (!inputNode) return

    inputNode.value = ''
    onChange(name, null)
  }
  useEffect(() => {
    if (!value) return

    const nextPreview = URL.createObjectURL(value)
    setPreview(nextPreview)

    return () => {
      setPreview(initialPreview)
      URL.revokeObjectURL(nextPreview)
    }
  }, [value, initialPreview])
  return (
    <>
      <img src={preview} alt="이미지 미리보기" width="200" height="200" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>✖</button>}
    </>
  )
}

export default FileInput
