import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ScrollToTop from "./components/navbar/Scrolltotop";
import OnlineUsers from "./components/navbar/OnlineUsers";
import Sidebar from "./components/navbar/Sidebar";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import { Routes } from "react-router-dom";
import Landing from "./pages/dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import Success from "./pages/payment/Success";
import Dashboard from "./pages/dashboard/Dashboard";
import Pending from "./pages/pending/Pending";
import Form from "./pages/form1/PretensaoDeSaida";
import Form2 from "./pages/form2/Form2";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route
                path="/login"
                element={
                  !user ? <Login /> : <Navigate to="/profile"></Navigate>
                }
              ></Route>
              <Route path="/signup" element={!user && <Signup />}></Route>

              <Route path="/form" element={user ? <Form /> : <Login />}></Route>
              <Route
                path="/pending"
                element={user ? <Pending /> : <Login />}
              ></Route>
              <Route
                path="/form2"
                element={user ? <Form2 /> : <Login />}
              ></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route path="/loans/:id" element={<Project />}></Route>
            </Routes>
          </div>
          {/* {user && <OnlineUsers />} */}
        </BrowserRouter>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
