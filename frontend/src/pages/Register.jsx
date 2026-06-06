import { useState } from "react";
import { toast } from "react-toastify";

import {
  Link,
  useNavigate,
} from "react-router-dom";
import api from "../api/axios";

function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

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

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
  await api.post(
    "/auth/register",
    {
      name,
      email,
      password,
    }
  );

if (res.data.token) {
  localStorage.setItem(
    "token",
    res.data.token
  );
  
  toast.success("Account created! Redirecting to profile...");
  
  setTimeout(() => {
    navigate("/profile");
  }, 500);
} else {
  toast.error("Registration failed");
}

      } catch (error) {

       toast.error(
  error.response?.data?.message ||
  "Registration Failed"
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
          Create your account
        </p>

        <form
          onSubmit={
            handleRegister
          }
        >
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
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
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p
          className="
            text-center
            mt-6
          "
        >
          Already have an account?

          <Link
            to="/"
            className="
              text-pink-600
              font-semibold
              ml-1
            "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;