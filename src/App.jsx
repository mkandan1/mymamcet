import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/Login"
import './App.css';
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Dashboard } from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/v1/auth/login" element={<Login />} />
          <Route path="/v1/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/web" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
