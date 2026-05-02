import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/appContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  const { token, user } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [errors, setErrors] = useState({});

  async function getPost() {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.post.user.id !== user.id) {
          navigate("/");
        }
        setFormData({
          title: data.post.title,
          body: data.post.body,
        });
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "put",
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

  useEffect(() => {
    getPost();
  }, [id, token, user, navigate]);

  return (
    <>
      <h1 className="title">Update post</h1>

      <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
        </div>

        <div>
          <textarea
            rows="6"
            placeholder="Post Content"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          ></textarea>
          {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
        </div>

        <button className="primary-btn">Update</button>
      </form>
    </>
  );
}
