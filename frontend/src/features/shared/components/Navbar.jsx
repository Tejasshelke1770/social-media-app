import "../nav.scss";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="nav-container">
      <h1>Instagram</h1>
      <button
        onClick={() => navigate("/create-post")}
        className="button-primary"
      >
        Create Post
      </button>
    </nav>
  );
};

export default Navbar;
