import React from 'react';
import {Button} from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import './BackTopButton'

interface BackTopButtonState {
    backToTop: boolean
}

class BackTopButton extends React.Component<any, BackTopButtonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            backToTop: false
        }
    }
    componentDidMount(): void {
        this.showBackToTop()
    }

    showBackToTop() {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                this.setState({ backToTop: true });
            } else {
                this.setState({ backToTop: false });
            }
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };
    render() {
        return (
            <div>
                {this.state.backToTop && (<Button className='back-to-top' onClick={this.scrollToTop}><ExpandCircleDownIcon /></Button>)}
            </div>
        );
    }
}

export default BackTopButton; 