import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import CarManage from "../pages/CarManage/CarManage";
import Home from "../pages/Home/home";
import DriverManage from "../pages/DriverManage/driverManage";
import Trip from "../pages/Trip/Trip";

import Layout from "../Components/Sidebar/layout";
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
            path="trip"
            element={
              <>
                <Trip />
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
