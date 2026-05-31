import { useRef, useState } from "react";
import "../styles/createpost.scss";
import usePost from "../hooks/usePost";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImg = useRef(null);
  const { createPostcontext, loading } = usePost();
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const file = postImg.current.files[0];
    await createPostcontext(file, caption);
    setCaption("");
    postImg.current.value = null;
    navigate("/");
  };
  
  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleCreatePost}>
          <label className="imgLabel" htmlFor="postImg">
            Select image
          </label>
          <input
            ref={postImg}
            hidden
            type="file"
            name="image"
            id="postImg"
            required
          />
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter caption"
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="button-primary" type="submit">
            {loading ? (
              <RotatingLines height="20" width="20" color="grey" />
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
