import React from 'react'
import { render } from 'react-dom'
import ErrorPage, { ErrorCode } from '../error/ErrorPage'

export const errorPage = (errorCode: number) => render(
  <ErrorPage errorCode={ErrorCode.NotFound}/>, document.getElementById('App') as HTMLElement
)

export const loadingPage = () => render(
  <ErrorPage errorCode={ErrorCode.NotFound} />, document.getElementById('App') as HTMLElement
)

function Logout() {
  return (
    <div>Logout</div>
  )
}

export default Logout