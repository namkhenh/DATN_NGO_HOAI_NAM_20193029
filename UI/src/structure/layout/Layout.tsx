import React from 'react';
import {Outlet} from 'react-router-dom';
import './Layout.scss'
import Footer from '../footer/Footer';
import { Header } from '../header/Header';

export function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}
