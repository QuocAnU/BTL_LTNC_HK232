import { useEffect, useState } from "react";
import DriverCard from "../../components/Card/driverCard";
import apiEndPoint from "../../components/Api/Drivers/apiDriver";
import styles from "./driverManage.module.scss";
import classNames from "classnames/bind";

import { Modal, Button } from "@mui/material";
import DetailInfoDriver from "../../components/Modal/modalDriver";

const cx = classNames.bind(styles);


const DriverManage = () => {
    const [driverData, setDriverData] = useState(null)
    const [loading, setLoading] = useState(true);

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);

    const handleShowMore = () => {
        setEnd((prev) => prev + 8);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndPoint.getAllDrivers();
                setDriverData(data)
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





    const newDriverData = driverData ? driverData.slice(start, end) : [];

    const handleDriverClick = (driver) => {
        console.log("Handle driver click", driver)
        setSelectedDriver(driver);
        setModalOpen(true); // Open modal
    };

    const handleCloseModal = () => {
        setSelectedDriver(null);
        setModalOpen(false);
    };

    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '80%' }}>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={cx("styles-box")} >
                        <div className={cx("listdriver")}>
                            {newDriverData.map((item) => {
                                return (
                                    <div key={item._id} onClick={() => handleDriverClick(item)}>
                                        <DriverCard driverData={item} />
                                    </div>
                                );
                            })}

                        </div>

                        {driverData && driverData.length > end && (
                            <Button  className={cx("more_button")} onClick={handleShowMore} variant="contained">
                                More
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <Modal open={modalOpen} onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                <>
                    < DetailInfoDriver selectedDriver={selectedDriver} modalOpen={modalOpen} /> </>

            </Modal>
        </div>
    );
}

export default DriverManage;
