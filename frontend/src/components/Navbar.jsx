import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");

  };

  return (
    <nav
      className="
        bg-white
        shadow-md
        px-8
        py-4
        flex
        justify-between
        items-center
        mb-6
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          text-pink-600
        "
      >
        ❤️ MatchAI
      </h1>

      <div
        className="
          flex
          items-center
          gap-6
        "
      >
        <Link
          to="/dashboard"
          className="
            text-gray-700
            hover:text-pink-600
            font-medium
          "
        >
          Dashboard
        </Link>

        <Link
          to="/connections"
          className="
            text-gray-700
            hover:text-pink-600
            font-medium
          "
        >
          Connections
        </Link>

        <button
          onClick={logout}
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-red-600
          "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;