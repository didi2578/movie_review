import React from 'react'
import styled from 'styled-components'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}

const ReviewListItem = ({ item, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(item.id)
  }
  return (
    <ReviewItem>
      <img className="ReviewListItem_img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </ReviewItem>
  )
}

const ReviewList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li>
            <ReviewListItem item={item} onDelete={onDelete} />
          </li>
        )
      })}
    </ul>
  )
}
export default ReviewList

const ReviewItem = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  .ReviewListItem_img {
    width: 200px;
    height: 300px;
    object-fit: cover;
    margin-right: 20px;
  }
`
