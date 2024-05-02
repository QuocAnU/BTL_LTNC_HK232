import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";
import Header from "./../Header/Header";

import styles from './sidebar.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)


export default function Layout() {
    return (
        <>
            <div className={cx('layout')} >
                <SideBar />
                <div className={cx('layout-header')}>
                    <Header />
                    <div className={cx('layout-out')}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}