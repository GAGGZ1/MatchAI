const Like = require("../models/like");
const Match = require("../models/match");
const Pass = require("../models/Pass");

exports.likeUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(400).json({
        message: "targetUserId is required",
      });
    }

    const existingLike = await Like.findOne({
      fromUser: req.user.id,
      toUser: targetUserId,
    });

    if (existingLike) {
      return res.status(400).json({
        message: "Already liked",
      });
    }

    await Like.create({
      fromUser: req.user.id,
      toUser: targetUserId,
    });

    const reverseLike = await Like.findOne({
      fromUser: targetUserId,
      toUser: req.user.id,
    });

    if (reverseLike) {
      const existingMatch = await Match.findOne({
        $or: [
          {
            user1: req.user.id,
            user2: targetUserId,
          },
          {
            user1: targetUserId,
            user2: req.user.id,
          },
        ],
      });

      if (existingMatch) {
        return res.status(200).json({
          matched: true,
          match: existingMatch,
        });
      }

      const match = await Match.create({
        user1: req.user.id,
        user2: targetUserId,
        score: 85,
        explanation: "Mutual Like",
      });

      return res.status(200).json({
        matched: true,
        match,
      });
    }

    return res.status(200).json({
      matched: false,
      message: "Like saved",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.passUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    await Pass.create({
      fromUser: req.user.id,
      toUser: targetUserId,
    });

    res.status(200).json({
      success: true,
      message: "User passed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
