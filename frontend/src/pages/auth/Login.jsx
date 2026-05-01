import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/appContext";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setToken(data.token);
      navigate("/");
      console.log("Login successful", data);
    }
  }

  return (
    <>
      <h1 className="title"> login posts </h1>

      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6 ">
        <div>
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button type="submit" className="primary-btn">Login</button>
      </form>
    </>
  )
}