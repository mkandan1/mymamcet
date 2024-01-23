import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/auth/login/Login"
import './App.css';

function App(){

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/v1/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
