function CompatibilityModal({
  data,
  onClose,
}) {

  if (!data) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-8
          w-full
          max-w-2xl
        "
      >
        <h2
          className="
            text-3xl
            font-bold
            mb-4
          "
        >
          🤖 AI Compatibility Report
        </h2>

        <div
          className="
            inline-block
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            font-semibold
            mb-4
          "
        >
          Compatibility Score:
          {" "}
          {data.score}%
        </div>

        <div
          className="
            bg-gray-50
            p-4
            rounded-xl
            mb-6
          "
        >
          <p className="text-gray-700">
            {data.reason}
          </p>
        </div>

        <div className="mb-6">

          <h3
            className="
              text-green-600
              font-bold
              text-xl
              mb-3
            "
          >
            ✅ Green Flags
          </h3>

          <ul className="space-y-2">

            {data.greenFlags?.map(
              (flag, index) => (
                <li
                  key={index}
                  className="
                    bg-green-50
                    p-3
                    rounded-lg
                  "
                >
                  {flag}
                </li>
              )
            )}

          </ul>

        </div>

        <div className="mb-6">

          <h3
            className="
              text-yellow-600
              font-bold
              text-xl
              mb-3
            "
          >
            ⚠ Yellow Flags
          </h3>

          <ul className="space-y-2">

            {data.yellowFlags?.map(
              (flag, index) => (
                <li
                  key={index}
                  className="
                    bg-yellow-50
                    p-3
                    rounded-lg
                  "
                >
                  {flag}
                </li>
              )
            )}

          </ul>

        </div>

        <div className="flex justify-end">

          <button
            onClick={onClose}
            className="
              bg-pink-500
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-pink-600
            "
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}

export default CompatibilityModal;
