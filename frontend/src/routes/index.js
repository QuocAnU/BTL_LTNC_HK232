import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import CarManage from "../pages/CarManage/CarManage";
import Header from "../components/Header/Header";
import Home from "../pages/Home/home";
import DriverManage from "../pages/DriverManage/driverManage";
import Sidebar from "../components/Sidebar/sidebar";

import Layout
  from "../components/Sidebar/layout";
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/" element={<Layout />}>
          <Route
            path="carmanage"
            element={
              <>
                <CarManage />
              </>
            }
          />
          <Route
            path="drivermanage"
            element={
              <>
                <DriverManage />
              </>
            }
          />
        </Route>

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
              <Home />
            </>
          }
        />

      </Routes>
    </Router>
  );
};
