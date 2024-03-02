import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import CarManage from "../pages/CarManage/CarManage";
import Header from "../components/Header/Header";
import Home from "../pages/Home/home";
import DriverManage from "../pages/DriverManage/driverManage";
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="admin/carmanage"
          element={
            <>
              <CarManage />
            </>
          }
        />
        <Route
          path="admin/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/admin/drivermanage"
          element={
            <>
              <Header />
              <DriverManage />
            </>
          }
        />
      </Routes>
    </Router>
  );
};
