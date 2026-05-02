import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Network error", err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1 className="page-title">
        <span>Latest</span> Posts
      </h1>

      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-card__header">
                <h2 className="post-card__title">{post.title}</h2>
                <p className="post-card__meta">
                  Created by&nbsp;
                  <span className="author">{post.user.name}</span>
                  &nbsp;·&nbsp;
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="post-card__body">{post.body}</p>

              <div className="post-card__footer">
                <Link
                  to={`/posts/${post.id}`}
                  className="btn btn-ghost"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No Posts Found?</p>
          </div>
        )}
      </div>
    </div>
  );
}