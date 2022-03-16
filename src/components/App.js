import React, { useCallback, useEffect, useState } from 'react'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import useAsync from '../hooks/useAsync'
import { createReview, getReviews, updateReview, deleteReview } from '../api'
import LocaleSelect from './LocaleSelect'

import logoImg from '../assets/logo.png'
import ticketImg from '../assets/ticket.png'
import useTranslate from '../hooks/useTranslate'
import AppSortButton from 'assets/AppSortButton'
import styled from 'styled-components'

const LIMIT = 6

const App = () => {
  const t = useTranslate()
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
    <AppComponent>
      <AppNav>
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="MOVIDE PEDIA" />
          <LocaleSelect />
        </div>
      </AppNav>

      <AppContainer>
        <div
          className="App-ReviewForm"
          style={{
            backgroundImage: `url("${ticketImg}")`,
          }}
        >
          <ReviewForm
            onSubmit={createReview}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>

        <div className="App-sorts">
          <AppSortButton
            selected={order === 'createdAt'}
            onClick={handleNewestClick}
          >
            {t('newest')}
          </AppSortButton>
          <AppSortButton
            selected={order === 'rating'}
            onClick={handleBestClick}
          >
            {t('best')}
          </AppSortButton>
        </div>

        <div className="App-ReviewList">
          <ReviewList
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReview}
            onUpdateSuccess={handleUpdateSuccess}
          />
          {hasNext && (
            <button
              className="load_more"
              disabled={isLoading}
              onClick={handleLoadMore}
            >
              {t('load more')}
            </button>
          )}
          {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
      </AppContainer>

      <AppFooter>
        <div className="App-footer-container">
          {t('terms of service')} | {t('privacy policy')}
        </div>
      </AppFooter>
    </AppComponent>
  )
}

export default App

const AppComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  input,
  textarea {
    padding: 15px 20px;
    border: solid 1px #f9f9f9;
    border-radius: 6px;
    outline: none;
    font-size: 16px;
    background-color: #f9f9f9;
    font-family: sans-serif;
  }

  input::placeholder,
  textarea::placeholder {
    color: #bdbdbd;
  }

  input:focus,
  textarea:focus {
    border: solid 1px #d1d1d1;
  }
`

const AppNav = styled.nav`
  flex: none;
  height: 65px;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  .App-nav-container {
    width: 100%;
    max-width: 860px;
    margin: auto;
    display: flex;
    height: 100%;
    align-items: center;
    .App-logo {
      margin-top: -5px;
    }
  }
`

const AppContainer = styled.div`
  flex: 1 1;
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 50px 21px;

  .App-ReviewForm {
    padding: 30px 32px 30px 30px;
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    filter: drop-shadow(0 0 11px rgba(105, 105, 105, 0.2));
    border-radius: 5px;
  }

  .App-sorts {
    margin: 51px 0 23px;
  }

  .App-ReviewList {
    padding: 30px 30px 0;
    border-radius: 5px;
    box-shadow: 0 0 11px 0 rgba(105, 105, 105, 0.2);
    background-color: #fff;
    .load_more {
      width: 100%;
      padding: 25px 0;
      font-size: 16px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      :hover {
        font-weight: bold;
      }
    }
  }
`

const AppFooter = styled.footer`
  flex: none;
  background-color: #000;
  .App-footer-container {
    padding: 30px 21px;
    font-size: 14px;
    letter-spacing: -0.25px;
    text-align: right;
    color: #838383;
    width: 100%;
    max-width: 860px;
    margin: auto;
  }
`
