import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import CompatibilityModal from "../components/CompatibilityModal";
import IntroModal from "../components/IntroModal";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compatibility, setCompatibility] = useState(null);
  const [intro, setIntro] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [introLoading, setIntroLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await api.get("/matches");

      console.log("API Response:", res.data);

      setMatches(res.data.data || []);
    } catch (error) {
      console.error(error);
     toast.error(
  "Failed to load matches"
);
    } finally {
      setLoading(false);
    }
  };

  const checkCompatibility = async (userId) => {
    try {
      setAiLoading(true);

      const res = await api.post("/ai/compatibility", {
        targetUserId: userId,
      });

      setCompatibility(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setAiLoading(false);
    }
  };
  const likeUser = async (userId) => {
    try {
      const res = await api.post("/likes", {
        targetUserId: userId,
      });

      if (res.data.matched) {
        toast.success("🎉 It's a Match!");
      } else {
        toast.info("❤️ Like Sent");
        setMatches(matches.filter((m) => m.profile.userId !== userId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const passUser = async (userId) => {
    try {
      await api.post("/likes/pass", {
        targetUserId: userId,
      });
      toast.info("User passed");

      setMatches(matches.filter((m) => m.profile.userId !== userId));
    } catch (error) {
      console.log(error);
    }
  };
  const sendMatch = async (userId) => {
    try {
      setIntroLoading(true);

      const res = await api.post("/ai/intro", {
        targetUserId: userId,
      });

      setIntro(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIntroLoading(false);
    }
  };

  if (loading) {
  return (
    <>
      <Navbar />

      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-pink-50
          via-white
          to-purple-50
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div
          className="
            w-16
            h-16
            border-4
            border-pink-200
            border-t-pink-500
            rounded-full
            animate-spin
          "
        />

        <h2
          className="
            text-3xl
            font-bold
            mt-6
          "
        >
          Finding Your Matches ❤️
        </h2>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          AI is analyzing compatibility...
        </p>
      </div>
    </>
  );
}

  return (
    <>
      <Navbar />
      <div
        className="
    min-h-screen
    bg-gradient-to-br
    from-pink-50
    via-white
    to-purple-50
    p-8
  "
      >
        <h1 className="text-4xl font-bold mb-8">Recommended Matches</h1>
        {/* <button
  onClick={() =>
    navigate("/connections")
  }
>
  My Connections
</button> */}

        {matches.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold">No Matches Found</h3>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.profile._id}
              className="
  bg-white
  rounded-2xl
  shadow-lg
  p-6
  max-w-3xl
  mb-6
  hover:scale-[1.01]
  transition-all
  duration-300
"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="
      w-14
      h-14
      rounded-full
      bg-pink-100
      flex
      items-center
      justify-center
      text-2xl
    "
                >
                  ☺️
                </div>

                <div>
                  <h2 className="text-3xl font-bold">
                    {match.profile.userId?.name}
                  </h2>

                  <p className="text-gray-500">{match.profile.profession}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-500">Age</p>

                  <p className="font-semibold">{match.profile.age}</p>
                </div>

                <div>
                  <p className="text-gray-500">City</p>

                  <p className="font-semibold">{match.profile.city}</p>
                </div>

                <div>
                  <p className="text-gray-500">Gender</p>

                  <p className="font-semibold">{match.profile.gender}</p>
                </div>
              </div>
              <div className="mb-4">
                <span
                  className="
      bg-green-100
      text-green-700
      px-3
      py-2
      rounded-full
      font-semibold
    "
                >
                  Match Score: {match.finalScore}%
                </span>
              </div>
              <div className="flex gap-4 mb-4">
                <div
                  className="
      bg-blue-100
      px-3
      py-2
      rounded-lg
    "
                >
                  AI:
                  {match.aiScore}
                </div>

                <div
                  className="
      bg-yellow-100
      px-3
      py-2
      rounded-lg
    "
                >
                  Rules:
                  {match.businessScore}
                </div>
              </div>
              <p className="text-pink-600 font-semibold mb-4">{match.label}</p>
              <p>
                <div className="mb-5">
                  <p className="font-semibold mb-2">Interests</p>

                  <div className="flex gap-2 flex-wrap">
                    {match.profile.interests?.map((interest) => (
                      <span
                        key={interest}
                        className="
            bg-pink-100
            text-pink-700
            px-3
            py-1
            rounded-full
          "
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </p>
              <div className="flex gap-3 flex-wrap mt-4">
                <button
                  onClick={() =>
                  navigate(
  `/profile-details/${match.profile.userId._id}`
)
                  }
                  className="
      bg-gray-800
      text-white
      px-4
      py-2
      rounded-lg
    "
                >
                  View Profile
                </button>

                <button
                  onClick={() => checkCompatibility(match.profile.userId)}
                  disabled={aiLoading}
                  className="
    bg-blue-500
    text-white
    px-4
    py-2
    rounded-lg
  "
                >
                  {aiLoading ? "Analyzing..." : "AI Compatibility"}
                </button>

                <button
                  onClick={() => likeUser(match.profile.userId)}
                  className="
      bg-green-500
      text-white
      px-4
      py-2
      rounded-lg
    "
                >
                  ❤️ Like
                </button>

                <button
                  onClick={() => passUser(match.profile.userId)}
                  className="
      bg-red-500
      text-white
      px-4
      py-2
      rounded-lg
    "
                >
                  ❌ Pass
                </button>

                <button
                  onClick={() => sendMatch(match.profile.userId)}
                  disabled={introLoading}
                  className="
    bg-purple-500
    text-white
    px-4
    py-2
    rounded-lg
  "
                >
                  {introLoading ? "Generating..." : "AI Intro"}
                </button>
              </div>{" "}
            </div>
          ))
        )}

        <CompatibilityModal
          data={compatibility}
          onClose={() => setCompatibility(null)}
        />
        <IntroModal data={intro} onClose={() => setIntro(null)} />
      </div>
    </>
  );
}

export default Dashboard;
