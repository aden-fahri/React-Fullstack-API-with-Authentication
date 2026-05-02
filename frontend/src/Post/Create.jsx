import { useContext, useState } from "react";
import { AppContext } from "../Context/appContext";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: 'post',
        headers: {
          authorization: `Bearer ${token}`,
        },
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
        navigate("/");
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }


  return (
    <>
      <h1 className="title">Create a new post</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input type="text" placeholder="Post Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea rows="6" placeholder="Post Content" value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})}></textarea>
          {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
        </div>

        <button className="primary-btn">Create</button>
      </form>
    </>
  );
}