const mongoose = require("mongoose");

const passSchema =
  new mongoose.Schema(
    {
      fromUser: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      toUser: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Pass",
    passSchema
  );