import React from 'react';
import './LandingTeam.scss'

interface LandingTeamState {

}

interface LandingTeamProps {
    avatar: string;
    name: string;
    position: string;
    contact: string;
}
    

export default class LandingTeam extends React.Component<LandingTeamProps, LandingTeamState> {
    constructor(props: LandingTeamProps) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div id="teams-item" className="teams-item">
                <div className="teams-item-avatar" ><img src={this.props.avatar} alt="/" /></div>
                <div className="teams-item-name">B.S. {this.props.name}</div>
                <div className="teams-item-position">{this.props.position}</div>
                <div className="teams-item-contact">Liên hệ: {this.props.contact}</div>
            </div>
        );
    }
}