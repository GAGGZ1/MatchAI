function IntroModal({
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
          ✨ AI Generated Introduction
        </h2>

        <p
          className="
            text-gray-500
            mb-4
          "
        >
          Suggested opening message for your match
        </p>

        <div
          className="
            bg-gradient-to-r
            from-pink-50
            to-purple-50
            p-5
            rounded-xl
            border
          "
        >
          <p
            className="
              text-lg
              leading-relaxed
            "
          >
            {data.message}
          </p>
        </div>

        <div
          className="
            flex
            justify-between
            mt-6
          "
        >
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                data.message
              )
            }
            className="
              bg-blue-500
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-blue-600
            "
          >
            📋 Copy
          </button>

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

export default IntroModal;