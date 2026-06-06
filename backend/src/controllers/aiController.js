const Profile = require("../models/profile");
const {
  generateCompatibility,
  generateIntroMessage,
} = require("../services/groqService");

exports.compatibility = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const myProfile = await Profile.findOne({
      userId: req.user.id,
    });

    const targetProfile = await Profile.findOne({
      userId: targetUserId,
    });

    if (!myProfile || !targetProfile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const result = await generateCompatibility(myProfile, targetProfile);

    console.log(result);

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleaned));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.generateIntro = async (req, res) => {
  try {
    const { targetUserId } = req.body;

    const myProfile = await Profile.findOne({
      userId: req.user.id,
    });

    const targetProfile = await Profile.findOne({
      userId: targetUserId,
    });

    if (!myProfile || !targetProfile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const result = await generateIntroMessage(myProfile, targetProfile);

    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleaned));
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
