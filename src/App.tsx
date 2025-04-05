import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function App() {
  const [username, setusername] = useState("");
  const [Imageurl, setImageurl] = useState("");
  const [caption, setcaption] = useState("");
  const [posts, setposts] = useState([]);

  const handlepost = () => {
    if (username && Imageurl) {
      const newpost = {
        id: Date.now(),
        username,
        Imageurl,
        time: new Date().toDateString(),
        likes: 0,
        isliked: false,
        Comments: [],
        newcomment: "",
        caption,
      };

      setposts([...posts, newpost]);
      setusername("");
      setImageurl("");
      setcaption("");
    }
  };

  const handlelike = (id) => {
    setposts((pre) =>
      pre.map((post) =>
        post.id === id
          ? {
              ...post,
              isliked: !post.isliked,
              likes: post.isliked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handledelete = (id) => {
    setposts((pre) => pre.filter((post) => post.id !== id));
  };

  const handlecomments = (id) => {
    setposts((pre) =>
      pre.map((post) => {
        if (post.id === id && post.newcomment.trim() !== "") {
          return {
            ...post,
            Comments: [
              ...post.Comments,
              { id: Date.now(), text: post.newcomment },
            ],
            newcomment: "",
          };
        }
        return post;
      })
    );
  };

  const handledeletecomment = (postid, commentid) => {
    setposts((pre) =>
      pre.map((post) =>
        post.id === postid
          ? {
              ...post,
              Comments: post.Comments.filter(
                (comment) => comment.id !== commentid
              ),
            }
          : post
      )
    );
  };

  return (
    <div className="container mt-5 " style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        <h1>post generator</h1>
      </div>
      <div className="card p-3 mb-4">
        <label>Name :</label>
        <input
          type="text"
          className="form-control mb-2 mt-2"
          placeholder="enter your name"
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
        <label>Image Url:</label>
        <input
          type="text"
          className="form-control mb-2 mt-2"
          placeholder="enter your URL"
          onChange={(e) => setImageurl(e.target.value)}
          value={Imageurl}
        />
        <label>Caption :</label>
        <input
          type="text"
          className="form-control  mb-2 mt-2"
          placeholder="enter your caption"
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handlepost}>
          post
        </button>
      </div>
      <h1>Your posts</h1>
      <div
        className="container text-center "
        style={{ maxWidth: "400px", maxHeight: "200px" }}
      >
        {posts.map((post) => (
          <div className="card mb-4" key={post.id}>
            <div className="d-flex justify-content-between  align-items-start">
              <strong style={{ marginLeft: "10px" }}>@{post.username} </strong>
              <p style={{ marginLeft: "-20px" }}>.{post.time}</p>
            </div>
            <img
              src={post.Imageurl}
              className="card-img-top"
              alt="instagram post"
            />
            <div className="card-body d-flex ">
              <div className="like-logo ">
                <svg
                  aria-label="Like"
                  fill={post.isliked ? "red" : "currentColor"}
                  onClick={() => handlelike(post.id)}
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Like </title>
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                </svg>
                <span> {post.likes} likes</span>
              </div>
              <div className="comment-logo" style={{ marginLeft: "20px" }}>
                <svg
                  aria-label="Comment"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Comment</title>
                  <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </div>
              <div className="logoshare" style={{ marginLeft: "20px" }}>
                <svg
                  aria-label="Share"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Share</title>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </div>
              <button
                className="btn btn-danger ms-auto"
                onClick={() => handledelete(post.id)}
              >
                delete
              </button>
            </div>
            <p className="d-flex" style={{ marginLeft: "20px" }}>
              <strong> @{post.username}</strong>
              {post.caption}
            </p>

            <div className="p-2 border-top">
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="add a comment"
                  value={post.newcomment}
                  onChange={(e) =>
                    setposts((pre) =>
                      pre.map((p) =>
                        p.id === post.id
                          ? { ...p, newcomment: e.target.value }
                          : p
                      )
                    )
                  }
                />
                <button
                  onClick={() => handlecomments(post.id)}
                  className="btn btn-sm btn-outline-primary"
                >
                  Add
                </button>
              </div>
              {post.Comments.length > 0 && (
                <div className="mt-2 text-start">
                  <strong>Comments :</strong>
                  <ul className="list-unstyled">
                    {post.Comments.map((c) => (
                      <li
                        key={c.id}
                        className="border-bottom py-1 d-flex justify-content-between"
                      >
                        {c.text}
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handledeletecomment(post.id, c.id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
