
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/login'
export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="admin/login"
                    element={
                        <>
                            <Login />
                        </>

                    }
                />
            </Routes>
        </Router>
    )
}
