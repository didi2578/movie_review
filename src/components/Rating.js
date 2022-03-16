import React from 'react'
import styled from 'styled-components'

const RATINGS = [1, 2, 3, 4, 5]

const Star = ({ selected = false, rating = 0, onSelect, onHover, pointer }) => {
  const handleClick = onSelect ? () => onSelect(rating) : undefined
  const handleMouesOver = onHover ? () => onHover(rating) : undefined

  return (
    <Stars
      select={selected}
      onClick={handleClick}
      onMouseOver={handleMouesOver}
      pointer={pointer}
    >
      ★
    </Stars>
  )
}

const Rating = ({ value = 0, onSelect, onHover, onMouseOut, pointer }) => {
  return (
    <div onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
          pointer={pointer}
        />
      ))}
    </div>
  )
}

export default Rating

const Stars = styled.span`
  color: ${(props) => (props.select ? '#ffb700' : '#ffe5a2')};
  font-size: 25px;
  cursor: ${(props) => props.pointer && 'pointer'};
`
