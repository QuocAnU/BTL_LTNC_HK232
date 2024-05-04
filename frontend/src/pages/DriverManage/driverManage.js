import { useEffect, useState } from "react";
import DriverCard from "../../components/Card/driverCard";
import apiEndPoint from "../../components/Api/Drivers/apiDriver";
import styles from "./driverManage.module.scss";
import classNames from "classnames/bind";

import { Modal, Button } from "@mui/material";
import DetailInfoDriver from "../../components/Modal/modalDriver";
import CreateModalDriver from "../../components/Modal/createModalDriver";

const cx = classNames.bind(styles);


const DriverManage = () => {

    const [driverData, setDriverData] = useState(null)
    const [loading, setLoading] = useState(true);

    const [selectedDriver, setSelectedDriver] = useState(null);


    const [modalOpen, setModalOpen] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false)

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);

    const handleShowMore = () => {
        setEnd((prev) => prev + 8);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allDrivers = await apiEndPoint.getAllDrivers();
                const filteredDrivers = allDrivers.filter(driver => !driver.deleted);
                setDriverData(filteredDrivers.reverse());
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






    const handleDriverClick = (driver) => {
        console.log("Handle driver click", driver)
        setSelectedDriver(driver);
        setModalOpen(true); // Open modal
    };

    const handleCreateDriver = async () => {
        setCreateModalOpen(true)
    }
    const handleCloseModal = () => {
        setSelectedDriver(null);
        setModalOpen(false);
    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }

    const newDriverData = driverData ? driverData.slice(start, end) : [];


    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%' }}>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={cx("styles-boxs")} >
                        <div className={cx("listdriver")}>
                            {newDriverData.map((item) => {
                                return (
                                    <div key={item._id} onClick={() => handleDriverClick(item)} >
                                        <DriverCard driverData={item} setDriverData={setDriverData} setSelectedDriver={setSelectedDriver} />
                                    </div>
                                );
                            })}

                        </div>

                        {driverData && driverData.length > end && (
                            <Button onClick={handleShowMore} variant="contained">
                                More vehicle
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
                    < DetailInfoDriver selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} modalOpen={modalOpen} setModalOpen={setModalOpen} /> </>

            </Modal>
            <Modal open={createModalOpen} onClose={handleCloseCreateModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                <>
                    <CreateModalDriver createModalOpen={createModalOpen} setCreateModalOpen={setCreateModalOpen} />
                </>

            </Modal>
        </div>
    );
}

export default DriverManage;
