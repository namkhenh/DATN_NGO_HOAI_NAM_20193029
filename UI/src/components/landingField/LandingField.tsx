import React from 'react';
import Link from '@mui/material/Link';
import './LandingField.scss'

interface LandingFieldState {

}

interface LandingFieldProps {
    icon: string;
    title: string;
    subTitle: string;
    link: string
}
    

export default class LandingField extends React.Component<LandingFieldProps, LandingFieldState> {
    constructor(props: LandingFieldProps) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div id="fields-item" className="fields-item">
                <div className="fields-item-icon"><img src={this.props.icon} alt="/" /></div>
                <div className="fields-item-title">{this.props.title}</div>
                <div className="fields-item-sub-title">{this.props.subTitle}</div>
                <Link href={this.props.link} target='_blank' underline="hover" sx={{ fontSize: '16px', fontWeight: 600, color: '#0B395C' }} className='fields-item-view-more'>
                    <span>Xem chi tiết</span>
                </Link>
            </div>
        );
    }
}