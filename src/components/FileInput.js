import React, { useEffect, useRef, useState } from 'react'
import placeholderImg from '../assets/preview-placeholder.png'
import resetImg from '../assets/ic-reset.png'
import styled from 'styled-components'

const FileInput = ({ name, value, onChange, initialPreview }) => {
  const [preview, setPreview] = useState(initialPreview)

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
    <FileInputComponent value={value}>
      <img
        src={preview || placeholderImg}
        alt="이미지 미리보기"
        value={value}
      />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button onClick={handleClearClick}>
          <img src={resetImg} alt="선택해제" />
        </button>
      )}
    </FileInputComponent>
  )
}

export default FileInput

const FileInputComponent = styled.div`
  position: relative;
  width: 182px;
  height: 262px;
  border-radius: 0 15px 0 15px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    opacity: ${(props) => props.value && '0.48'};
  }
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  button {
    position: absolute;
    top: 9px;
    right: 9px;
    width: 26px;
    height: 26px;
    padding: 7px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
  }
`
