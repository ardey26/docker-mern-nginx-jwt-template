import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Landing = React.lazy(() => import("./pages/Landing"));

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={"Loading ..."}>
                <Dashboard />
              </React.Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={"Loading ..."}>
                <Landing />
              </React.Suspense>
            }
          />
        </Routes>
      </Router>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
