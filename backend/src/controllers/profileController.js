const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    {
      userId: req.user.id,
    },
    {
      ...req.body,
      userId: req.user.id,
    },
    {
      new: true,
      upsert: true,
    },
  );

  res.json(profile);
};
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
