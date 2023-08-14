import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute Component={<Dashboard />}></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
