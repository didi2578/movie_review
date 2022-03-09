import React, { useCallback, useEffect, useState } from 'react'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import useAsync from '../hooks/useAsync'
import { createReview, getReviews, updateReview, deleteReview } from '../api'
import { LocaleProvider } from '../contexts/LocaleContext'
import LocaleSelect from './LocaleSelect'

const LIMIT = 6

const App = () => {
  const [order, setOrder] = useState('createdAt')
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews)
  const [items, setItems] = useState([])
  const sortedItems = items.sort((a, b) => b[order] - a[order])

  const handleNewestClick = () => setOrder('createdAt')
  const handleBestClick = () => setOrder('rating')

  const handleDelete = async (id) => {
    const result = await deleteReview(id)
    alert('삭제하시겠습니까?')
    if (!result) return
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options)
      if (!result) return

      const { paging, reviews } = result
      if (options.offset === 0) {
        setItems(reviews)
      } else {
        setItems((prevItems) => [...prevItems, ...reviews])
      }
      setOffset(options.offset + options.limit)
      setHasNext(paging.hasNext)
    },
    [getReviewsAsync]
  )

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT })
  }

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems])
  }

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT })
  }, [order, handleLoad])

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id)
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ]
    })
  }

  return (
    <LocaleProvider defaultValue="ko">
      <>
        <LocaleSelect />
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleBestClick}>베스트</button>
        </div>
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        />
        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </>
    </LocaleProvider>
  )
}

export default App
