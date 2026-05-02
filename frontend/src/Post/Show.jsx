import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/appContext";

export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AppContext);

  const [post, setPost] = useState(null);

  async function getPost() {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data.post);
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === post.user.id) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "delete",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          await res.json();
          navigate("/");
        }
      } catch (err) {
        console.error("Network error", err);
      }
    }
  }

  useEffect(() => {
    getPost();
  }, [id]);

  return (
    <>
      {post ? (
        <div className="show-card">
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid #ede9fe" }}>
            <h2 className="post-card__title" style={{ fontSize: "1.65rem", marginBottom: "0.5rem" }}>
              {post.title}
            </h2>
            <p className="post-card__meta">
              Created by&nbsp;
              <span className="author">{post.user.name}</span>
              &nbsp;·&nbsp;
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>

          <p style={{ color: "#374151", lineHeight: "1.8", fontSize: "1rem", marginBottom: "2rem", whiteSpace: "pre-wrap" }}>
            {post.body}
          </p>

          {user && user.id === post.user.id && (
            <div className="post-actions">
              <Link to={`/posts/update/${post.id}`} className="btn btn-ghost">
                Update
              </Link>

              <form onSubmit={handleDelete} className="form-inline">
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>Post not found.</p>
        </div>
      )}
    </>
  );
}