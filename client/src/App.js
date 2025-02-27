import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./pages/stylesheets/alignments.css";
import "./pages/stylesheets/custom.css";
import "./pages/stylesheets/sizes.css";
import "./pages/stylesheets/theme.css";
import "./pages/stylesheets/form-elements.css";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
