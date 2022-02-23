import React, { useState } from 'react'
import FileInput from './FileInput'
import RatingInput from './RatingInput'

const ReviewForm = () => {
  const [values, setValues] = useState({
    title: '',
    rating: 0,
    content: '',
    imgFile: null,
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FileInput
          name="imgFile"
          value={values.imgFile}
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
      </form>
    </>
  )
}

export default ReviewForm
