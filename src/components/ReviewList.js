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
      <img src={item.imgUrl} alt={item.title} />
      <ReviewItemLow>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p className="date">{formatDate(item.createdAt)}</p>
        <p p className="content">
          {item.content}
        </p>

        <div>
          <Button onClick={handleEditClick} edit={true}>
            {t('edit button')}
          </Button>
          <Button onClick={handleDeleteClick} delete={true}>
            {t('delete button')}
          </Button>
        </div>
      </ReviewItemLow>
    </ReviewItem>
  )
}

const ReviewList = ({ items, onUpdate, onUpdateSuccess, onDelete }) => {
  const [editingId, setEditingId] = useState(null)
  const handleCancel = () => setEditingId(null)

  return (
    <UlReviewList>
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
    </UlReviewList>
  )
}
export default ReviewList

const ReviewItem = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  img {
    width: 182px;
    height: 262px;
    margin-right: 20px;
    border-radius: 0 15px 0 15px;
    object-fit: cover;
  }
`

const ReviewItemLow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 22px 0 18px;
  overflow: hidden;
  h1 {
    margin: 0 0 4px;
    font-weight: 400;
    font-size: 20px;
  }
  .date {
    margin: 8px 0 19px;
    color: #bdbdbd;
    font-size: 14px;
    letter-spacing: -0.25px;
  }
  .content {
    display: -webkit-box;
    flex: 1 1;
    margin: 0 0 19px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #545357;
    font-size: 16px;
    line-height: 1.63;
    letter-spacing: -0.2px;
  }
`

const Button = styled.button`
  padding: 0;
  border: none;
  color: ${(props) => (props.delete ? '#ff0023' : '#000')};
  margin-right: ${(props) => props.edit && '18px'};
  font-size: 16px;
  letter-spacing: -0.28px;
  background-color: transparent;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`

const UlReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  :not(:last-child) {
    border-bottom: 1px dashed #c5c5c5;
  }
  li {
    padding: 30px 0;
    max-height: 322px;
    overflow: hidden;
    :first-child {
      padding-top: 0;
    }
    :not(:last-child) {
      border-bottom: 1px dashed #c5c5c5;
    }
  }
`
