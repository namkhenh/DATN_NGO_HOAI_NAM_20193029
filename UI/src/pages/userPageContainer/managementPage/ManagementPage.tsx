import React, {Component} from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import {Outlet} from 'react-router-dom';
import './ManagementPage.scss'

class /*  */
ManagementPage extends Component {
    render() {
        return (
            <div id='management-page' className='management-page'>
                <div className="management-page-container">
                    <Sidebar></Sidebar>
                    <Outlet></Outlet>
                </div>
            </div>
        );
    }
}

export default ManagementPage;