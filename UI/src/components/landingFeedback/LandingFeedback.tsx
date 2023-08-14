import React from 'react';
import Rating from '@mui/material/Rating';
import './LandingFeedback.scss'

interface LandingFeedbackState {

}

interface LandingFeedbackProps {
    avatar: string;
    name: string;
    job: string;
    feedback: string;
    rate: number
}


export default class LandingFeedback extends React.Component<LandingFeedbackProps, LandingFeedbackState> {
    constructor(props: LandingFeedbackProps) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="feedback-item" className="feedback-item">
                <div className="feedback-item-header">
                    <div className="feedback-item-avatar" ><img src={this.props.avatar} alt="/" /></div>
                    <div className="feedback-item-info">
                        <div className="feedback-item-name">{this.props.name}</div>
                        <div className="feedback-item-job">{this.props.job}</div>
                    </div>
                </div>
                <div className="feedback-item-content">{this.props.feedback}</div>
                <div className="feedback-item-rate">
                    <span className="rate-text">Đánh giá</span>
                    <Rating name="half-rating-read" readOnly defaultValue={this.props.rate} />
                </div>
            </div>
        );
    }
}