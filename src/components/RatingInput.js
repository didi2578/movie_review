import React, { useState } from 'react'
import Rating from './Rating'

const RatingInput = ({ name, value, onChange, pointer }) => {
  const [rating, setRating] = useState(value)

  const handleSelect = (nextValue) => onChange(name, nextValue)

  const handleMouseOut = () => setRating(value)
  return (
    <Rating
      RatingInput={RatingInput}
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
      pointer={pointer}
    />
  )
}

export default RatingInput
