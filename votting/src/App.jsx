import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";

// Admin pages Routes
import AdminLogin from "./admin/pages/AdminLogin";
import Register from "./admin/pages/Register";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ViewSubadmin from "./admin/pages/ViewSubAdmin";
import AddSubadmin from "./admin/pages/AddSubAdmin";
import EditSubadmin from "./admin/pages/EditSubAdmin";
// Components
import Topsection from "./components/Topsection";
import TableComponent from "./components/TableComponent";
import Counter from "./components/Counter";
import Footer from "./components/Footer";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Home from "./components/Home";
import UserGreeting from "./components/UserGreeting";
import UserIndex from "./pages/UserIndex";

function App() {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/admin-login"
          element={<AdminLogin setUser={setAdmin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard user={admin} setUser={setAdmin} />}
        />
        <Route path="/add-subadmin" element={<AddSubadmin />} />
        <Route path="/view-subadmin" element={<ViewSubadmin />} />
        <Route path="/edit-subadmin/:id" element={<EditSubadmin />} />

        <Route path="/user-register" element={<UserRegister />} />

        <Route path="/home" element={<Home />} />

        {/* Dynamic Route for User Greeting */}
        <Route path="/:username" element={<UserGreeting />} />
        <Route path="/:username/user-login" element={<UserLogin />} />
        <Route path="/:username/user-index" element={<UserIndex />} />

        <Route
          path="/"
          element={
            <>
              <Topsection />
              {/* <TableComponent /> */}
              {/* <Counter /> */}
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
