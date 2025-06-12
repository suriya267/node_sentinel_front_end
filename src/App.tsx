import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserView from "./pages/UserView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
