import App from 'components/App'
import { LocaleProvider } from 'contexts/LocaleContext'
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyles from 'styles/GlobalStyles'

ReactDOM.render(
  <LocaleProvider defaultValue="ko">
    <GlobalStyles />
    <App />
  </LocaleProvider>,

  document.getElementById('root')
)
