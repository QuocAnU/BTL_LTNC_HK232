import { Button } from '@mui/material'
import { useState, useEffect } from 'react';
import DriverCard from '../Card/driverCard';
import apiEndPoint from '../Api/Drivers/apiDriver';

import styles from "./modalDriver.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const DetailInfoDriver = ({ selectedDriver, setSelectedDriver, modalOpen, setModalOpen }) => {

    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndPoint.getHistoryDrivers(selectedDriver._id);
                setHistory(data)
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (



        <div className={cx('modal-content')}>
            <h1 className={cx('text')} > Detail Information </h1>
            <div className={cx('content')}>
                <DriverCard driverData={selectedDriver} setSelectedDriver={setSelectedDriver} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                <div className={cx('history-content')}>
                    <h2 className={cx('route-history')}>Route history</h2>
                    <div className={cx("styles-box", "table-container")}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Route ID</th>
                                    <th>Length</th>
                                </tr>
                            </thead>

                            <tbody>
                                {history &&

                                    history.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.date_start}</td>
                                            <td>{item.STT}</td>
                                            <td>{item.distance} km</td>
                                        </tr>
                                    ))
                                }
                            </tbody>



                        </table>
                    </div>
                </div>

            </div>

        </div>


    )

}

export default DetailInfoDriver;