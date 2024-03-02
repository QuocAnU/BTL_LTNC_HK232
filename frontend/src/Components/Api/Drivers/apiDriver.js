import axios from 'axios';

const API_URL = 'http://localhost:3001/drivers';

const api = axios.create({
    baseURL: API_URL,
})

const apiEndPoints = {
    getAllDrivers: async () => {
        const accessToken = localStorage.getItem('token');
        console.log(accessToken)
        try {
            const response = await api.get("/", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
            )
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Error fetching book:", error);
            throw error;
        }
    }
}
export default apiEndPoints;


