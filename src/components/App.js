import React, { useEffect, useState } from 'react'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import { getReviews } from '../api'

const LIMIT = 6

const App = () => {
  const [order, setOrder] = useState('createdAt')
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState([])
  const sortedItems = items.sort((a, b) => b[order] - a[order])

  const handleNewestClick = () => setOrder('createdAt')
  const handleBestClick = () => setOrder('rating')

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id)
    setItems(nextItems)
  }

  const handleLoad = async (options) => {
    console.log('옵션', options)
    let result
    try {
      setIsLoading(true)
      result = await getReviews(options)
    } catch (error) {
      console.log(error)
      return
    } finally {
      setIsLoading(false)
    }
    const { paging, reviews } = result
    if (options.offset === 0) {
      setItems(reviews)
    } else {
      setItems((prevItems) => [...prevItems, ...reviews])
    }
    setOffset(options.offset + options.limit)
    setHasNext(paging.hasNext)
  }

  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT })
  }

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT })
  }, [order])

  return (
    <>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트</button>
      </div>
      <ReviewForm />
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
    </>
  )
}

export default App
