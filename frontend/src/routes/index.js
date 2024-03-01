import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/login";
import CarManage from "../pages/CarManage/CarManage";
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
      </Routes>
    </Router>
  );
};
