import React, { useState } from 'react'
import FileInput from './FileInput'
import useAsync from '../hooks/useAsync'
import RatingInput from './RatingInput'

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
}

const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) => {
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit)

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('rating', values.rating)
    formData.append('content', values.content)
    formData.append('imgFile', values.imgFile)

    const result = await onSubmitAsync(formData)
    if (!result) return

    const { review } = result
    setValues(INITIAL_VALUES)
    onSubmitSuccess(review)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          initialPreview={initialPreview}
          onChange={handleChange}
        />
        <input name="title" value={values.title} onChange={handleInputChange} />
        <RatingInput
          name="rating"
          value={values.rating}
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
        {onCancel && <button onClick={onCancel}>취소</button>}
        <button disabled={isSubmitting} type="submit">
          확인
        </button>
        {submittingError && <div>{submittingError.message}</div>}
      </form>
    </>
  )
}

export default ReviewForm
