import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Connections() {

  const [connections, setConnections] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections =
    async () => {

      try {

        const res =
          await api.get(
            "/matches/connections"
          );

        setConnections(
          res.data.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading) {
   return (
  <>
    <Navbar />

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >
      <h2
        className="
          text-3xl
          font-bold
        "
      >
        Loading Connections...
      </h2>
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
    <h1
  className="
    text-4xl
    font-bold
    mb-8
  "
>
  ❤️ My Connections
</h1>

      {connections.length === 0 ? (
       <div
  className="
    bg-white
    p-8
    rounded-2xl
    shadow-lg
  "
>
  <h3
    className="
      text-2xl
      font-semibold
    "
  >
    No Connections Yet
  </h3>
</div>
      ) : (
        connections.map(
          (connection) => (

          <div
  key={connection.matchId}
  className="
    bg-white
    rounded-2xl
    shadow-lg
    p-6
    mb-6
    max-w-2xl
    hover:shadow-xl
    transition-all
  "
>

              <div className="flex items-center gap-4 mb-4">

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
    ❤️
  </div>

  <div>

    <h3
      className="
        text-2xl
        font-bold
      "
    >
      {connection.name}
    </h3>

    <p className="text-gray-500">
      {connection.email}
    </p>

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
    Match Score:
    {" "}
    {connection.score}
  </span>

</div>

<div
  className="
    bg-pink-50
    p-4
    rounded-xl
  "
>
  <p>
    {connection.explanation}
  </p>
</div>

            </div>

          )
        )
      )}

    </div>
</>
  );

}

export default Connections;