import useTranslate from 'hooks/useTranslate'
import React, { useState } from 'react'
import styled from 'styled-components'
import Rating from './Rating'
import ReviewForm from './ReviewForm'

const formatDate = (value) => {
  const date = new Date(value)
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}

const ReviewListItem = ({ item, onDelete, onEdit }) => {
  const t = useTranslate()

  const handleDeleteClick = () => {
    onDelete(item.id)
  }

  const handleEditClick = () => {
    onEdit(item.id)
  }
  return (
    <ReviewItem>
      <img className="ReviewListItem_img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <h2>{item.id}</h2>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleEditClick}>{t('edit button')}</button>
        <button onClick={handleDeleteClick}>{t('delete button')}</button>
      </div>
    </ReviewItem>
  )
}

const ReviewList = ({ items, onUpdate, onUpdateSuccess, onDelete }) => {
  const [editingId, setEditingId] = useState(null)
  const handleCancel = () => setEditingId(null)

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item
          const initialValues = { title, rating, content, imgFile: null }

          const handleSubmit = (formData) => onUpdate(id, formData)

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review)
            setEditingId(null)
          }

          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmitSuccess={handleSubmitSuccess}
                onSubmit={handleSubmit}
              />
            </li>
          )
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
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
