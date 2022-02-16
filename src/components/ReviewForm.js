import React, { useState } from 'react'

const ReviewForm = () => {
  const [values, setValues] = useState({
    title: '',
    rating: 0,
    content: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }))
  }

  return (
    <>
      <form>
        <input name="title" value={values.title} onChange={handleChange} />
        <input
          name="rating"
          type="number"
          value={values.rating}
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={values.content}
          onChange={handleChange}
        />
      </form>
    </>
  )
}

export default ReviewForm
