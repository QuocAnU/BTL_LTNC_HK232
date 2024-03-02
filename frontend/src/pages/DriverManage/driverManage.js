import { useEffect, useState } from "react";
import DriverCard from "../../components/Card/driverCard";
import apiEndPoint from "../../components/Api/Drivers/apiDriver";

const DriverManage = () => {
    const [driverData, setDriverData] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiEndPoint.getAllDrivers();
                setDriverData(data)
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    console.log("Driver data:", driverData);
    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}> {/* Center align the box */}
            <div style={{ width: '80%' }}> {/* Adjust width of the box */}
                {/* Add a box around the DriverCard */}
                <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
                    <DriverCard driverData={driverData} />
                </div>
            </div>
        </div>
    );
}

export default DriverManage;
