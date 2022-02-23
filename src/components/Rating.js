import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const RATINGS = [1, 2, 3, 4, 5]

const Star = ({ selected = false, rating = 0, onSelect, onHover }) => {
  const className = `Rating-star ${selected ? 'selected' : ''}`
  const handleClick = onSelect ? () => onSelect(rating) : undefined

  const handleMouesOver = onHover ? () => onHover(rating) : undefined
  return (
    <FontAwesomeIcon
      icon={faStar}
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouesOver}
    />
  )
}

const Rating = ({ className, value = 0, onSelect, onHover, onMouseOut }) => {
  return (
    <StarWrapper className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </StarWrapper>
  )
}

export default Rating

const StarWrapper = styled.div`
  .Rating-star {
    color: gray;
  }

  .Rating-star.selected {
    color: #b6f509;
  }
`
