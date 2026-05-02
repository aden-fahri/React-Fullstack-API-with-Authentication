import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/appContext";

export default function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: 'post',
        body: JSON.stringify(formData),
      });

      if (!res.ok && res.status >= 500) {
        console.error("Server error", res.status);
        return;
      }

      const data = await res.json();

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setToken(data.token);
        navigate("/");
        console.log("Registration successful", data);
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  return (
    <>
      <h1 className="title"> register posts </h1>


      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6 ">
        <div>
          <input type="text" placeholder="Username" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <input type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})} />
          {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}  
        </div>
        <button type="submit" className="primary-btn">Register</button>
      </form>
    </>
  )
}