import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          res.data.token
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        toast.error(
  error.response?.data?.message ||
  "Login Failed"
);

      } finally {

        setLoading(false);

      }

    };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-pink-50
        via-white
        to-purple-50
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-center
            text-pink-600
            mb-2
          "
        >
          ❤️ MatchAI
        </h1>

        <p
          className="
            text-center
            text-gray-500
            mb-8
          "
        >
          Find meaningful connections
        </p>

        <form
          onSubmit={
            handleLogin
          }
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-6
            "
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="
              w-full
              bg-pink-500
              text-white
              py-3
              rounded-lg
              font-semibold
              hover:bg-pink-600
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-6
          "
        >
          New here?

          <Link
            to="/register"
            className="
              text-pink-600
              font-semibold
              ml-1
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;