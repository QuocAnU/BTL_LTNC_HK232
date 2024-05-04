import { useEffect, useState } from "react";
import DriverCard from "../../Components/Card/driverCard";
import apiEndPoint from "../../Components/Api/Drivers/apiDriver";
import styles from "./driverManage.module.scss";
import classNames from "classnames/bind";

import { Modal, Button } from "@mui/material";
import DetailInfoDriver from "../../Components/Modal/modalDriver";
import CreateModalDriver from "../../Components/Modal/createModalDriver";

const cx = classNames.bind(styles);


const DriverManage = () => {

    const [driverData, setDriverData] = useState(null)
    const [loading, setLoading] = useState(true);

    const [selectedDriver, setSelectedDriver] = useState(null);


    const [modalOpen, setModalOpen] = useState(false);

    const [createModalOpen, setCreateModalOpen] = useState(false)

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(8);

    const [searchQuery, setSearchQuery] = useState("");

    const handleShowMore = () => {
        setEnd((prev) => prev + 8);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allDrivers = await apiEndPoint.getAllDrivers();
                const filteredDrivers = allDrivers.filter(driver => !driver.deleted);
                setDriverData(filteredDrivers.reverse());
                console.log("driver: ", allDrivers)
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
        // window.location.reload()

    };

    const handleCloseCreateModal = () => {
        setCreateModalOpen(false)
    }

    const newDriverData = driverData ? driverData.slice(start, end) : [];

    const filteredDriverData = driverData ? driverData.filter(driver =>
        driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div style={{ paddingTop: '0px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', background: '#f2f2f2', borderRadius: '20px' }}>
                <h1>List Of Driver Available</h1>
                <div> <Button
                    onClick={() => handleCreateDriver()}
                    variant="contained"
                    size="large">Add driver</Button>

                    <input
                        style={{
                            height: '35px',
                            borderRadius: '5px',
                            // width: '50%',
                            border: '1px solid',
                            marginLeft: '50px',
                            paddingLeft: '10px'
                        }}
                        type="text"
                        placeholder="Search driver"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className={cx("styles-boxs")} >
                        <div className={cx("listdriver")}>
                            {filteredDriverData.map((item) => {
                                return (
                                    <div key={item._id} onClick={() => handleDriverClick(item)} >
                                        <DriverCard driverData={item} setDriverData={setDriverData} setSelectedDriver={setSelectedDriver} />
                                    </div>
                                );
                            })}

                        </div>

                        {driverData && driverData.length > end && (
                            <Button onClick={handleShowMore} variant="contained" style={{ marginTop: '30px', marginBottom: '50px' }}>
                                More driver
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
