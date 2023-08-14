import React from 'react'
import './ErrorPage.scss'
export enum ErrorCode {
    None = 0,
    Succeed = 1,
    ValidationFailed = 2,
    ServiceError = 500,
    NotFound = 404,
    NotPermission = 401,
}

interface ErrorPageProps {
  errorCode: ErrorCode
}

function ErrorPage(props: ErrorPageProps) {
  return (
    <div id='not-found'>
      <div className="not-found">
        <div className="not-found-404">
          <h1>{props.errorCode === ErrorCode.NotFound ? '404' : '401'}</h1>
        </div>
        <h2>{props.errorCode === ErrorCode.NotFound ? 'Xin lỗi, Trang không tìm thấy!' : 'Xin lỗi, Bạn không có quyền truy cập thao tác này!'}</h2>
        <p>Vui lòng liên hệ hotline để nhận sự trợ giúp.</p>
        <a href="/trang-chu">Trở về Trang Chủ</a>
      </div>
    </div>
  )
}

export default ErrorPage