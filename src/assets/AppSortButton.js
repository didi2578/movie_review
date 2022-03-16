import React from 'react'
import styled from 'styled-components'

const AppSortButton = ({ selected, children, onClick }) => {
  return (
    <Button select={selected} disabled={selected} onClick={onClick}>
      {children}
    </Button>
  )
}

export default AppSortButton

const Button = styled.button`
  padding: 12px 40px;
  border: none;
  color: ${(props) => (props.select ? '#fff' : '#000')};
  font-weight: 600px;
  font-size: 18px;
  background-color: ${(props) => (props.select ? '#000' : 'transparent')};
  border-radius: ${(props) => props.select && '0 10px 0 10px'};

  :not(:disabled) {
    cursor: pointer;
  }
`
