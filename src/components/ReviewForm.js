import React, { useState } from 'react'
import FileInput from './FileInput'
import useAsync from '../hooks/useAsync'
import RatingInput from './RatingInput'
import useTranslate from 'hooks/useTranslate'
import styled from 'styled-components'

const INITIAL_VALUES = {
  title: '',
  rating: 0,
  content: '',
  imgFile: null,
}

const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) => {
  const t = useTranslate()
  const [values, setValues] = useState(initialValues)
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit)

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('rating', values.rating)
    formData.append('content', values.content)
    formData.append('imgFile', values.imgFile)

    const result = await onSubmitAsync(formData)
    if (!result) return

    const { review } = result
    setValues(INITIAL_VALUES)
    onSubmitSuccess(review)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FileInput
          className="ReviewForm-preview"
          name="imgFile"
          value={values.imgFile}
          initialPreview={initialPreview}
          onChange={handleChange}
        />
        <FormLow>
          <div className="ReviewForm-title-rating">
            <input
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder={t('title placeholder')}
            />
            <RatingInput
              name="rating"
              value={values.rating}
              onChange={handleChange}
              pointer={true}
            />
          </div>
          <textarea
            name="content"
            value={values.content}
            onChange={handleInputChange}
            placeholder={t('content placeholder')}
          />
          <FormError>
            <div className="ReviewForm-error">
              {submittingError && <div>{submittingError.message}</div>}
            </div>
            <div>
              {onCancel && (
                <Button onClick={onCancel} cancel={true}>
                  {t('cancel button')}
                </Button>
              )}
              <Button disabled={isSubmitting} type="submit" submit={true}>
                {t('confirm button')}
              </Button>
            </div>
          </FormError>
        </FormLow>
      </Form>
    </>
  )
}

export default ReviewForm

const Form = styled.form`
  display: flex;
  max-width: 100%;
`
const FormLow = styled.div`
  margin-left: 22px;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  overflow: hidden;
  .ReviewForm-title-rating {
    display: flex;
    align-items: center;
    margin-bottom: 21px;
    input {
      flex: 1 1;
      margin-right: 22px;
      min-width: 0;
    }
  }
  textarea {
    height: 127px;
    margin-bottom: 16px;
    resize: none;
  }
`
const FormError = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  .ReviewForm-error {
    flex: 1 1;
    margin-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ff0023;
    font-size: 14px;
  }
`

const Button = styled.button`
  padding: 11px 40px;
  border: none;
  color: ${(props) => (props.submit ? '#fff' : '#000')};
  font-weight: 600px;
  font-size: 17px;
  cursor: pointer;
  background-color: ${(props) => (props.submit ? '#000' : 'transparent')};
  margin-right: ${(props) => props.cancel && '10px'};
  border-radius: ${(props) => props.submit && '0 10px 0 10px'};
`
