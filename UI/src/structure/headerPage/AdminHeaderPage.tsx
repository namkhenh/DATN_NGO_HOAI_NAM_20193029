import React from 'react'
import './AdminHeaderPage.scss'
interface HeaderPageProps {
    icon: JSX.Element
    text: string
    textChild?: string
}
function AdminHeaderPage(props: HeaderPageProps) {
    return (
        <div className="admin-page-header">{props.icon}
            <div className={props.textChild ? "admin-text-previous" : "admin-text-current"}>{props.text}</div>
            {props.textChild && <div className="admin-text-current">/ {props.textChild}</div>}
        </div>
    )
}

export default AdminHeaderPage