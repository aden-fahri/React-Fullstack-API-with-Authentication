import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Create from "./Post/Create";
import Show from "./Post/Show";
import Update from "./Post/Update";
import { AppContext } from "./Context/appContext";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={user ? <Create /> : <Navigate to="/login" />} />
          <Route path="posts/:id" element={<Show />} />
          <Route path="posts/update/:id" element={user ? <Update /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}