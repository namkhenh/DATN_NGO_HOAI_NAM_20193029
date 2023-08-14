import React from 'react';
import './HeaderPage.scss'

interface HeaderPageProps {
    icon: JSX.Element
    text: string
    textChild?: string
}

const HeaderPage = (props: HeaderPageProps) => {
    return (
        <div className="page-header">{props.icon}
            <div className={props.textChild ? "text-previous" : "text-current"}>{props.text}</div>
            {props.textChild && <div className="text-current">/ {props.textChild}</div>}
        </div>
    );
}

export default HeaderPage;