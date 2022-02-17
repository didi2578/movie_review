import React, { useEffect, useRef, useState } from 'react'

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState()
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
      setPreview()
      URL.revokeObjectURL(nextPreview)
    }
  }, [value])
  return (
    <>
      {value && (
        <img src={preview} alt="이미지 미리보기" width="200" height="200" />
      )}
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>✖</button>}
    </>
  )
}

export default FileInput
