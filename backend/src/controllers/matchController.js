const Profile = require("../models/Profile");
const Match = require("../models/Match");
const Pass = require("../models/Pass");
const Like = require("../models/Like");

const { calculateBusinessScore } = require("../utils/matchScore");

const { getCompatibilityScore } = require("../services/groqService");

exports.getRecommendations = async (req, res) => {
  try {
    const myProfile = await Profile.findOne({
      userId: req.user.id,
    });

    if (!myProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    const passedUsers = await Pass.find({
      fromUser: req.user.id,
    });

    const passedIds = passedUsers.map((pass) => pass.toUser);
    const likedUsers = await Like.find({
      fromUser: req.user.id,
    });

    const likedIds = likedUsers.map((like) => like.toUser);

    const hiddenIds = [...passedIds, ...likedIds];
    // const candidates = await Profile.find({
    //   gender: myProfile.lookingFor,
    //   userId: { $ne: req.user.id },
    // });
    const candidates = await Profile.find({
      gender: myProfile.lookingFor,

      userId: {
        $ne: req.user.id,
        $nin: hiddenIds,
      },
    }).populate("userId", "name email");

    // const recommendations = candidates.map(
    //   (candidate) => {
    //     let score = 0;

    //     // Shared Interests
    //     const commonInterests =
    //       candidate.interests.filter(
    //         (interest) =>
    //           myProfile.interests.includes(
    //             interest
    //           )
    //       ).length;

    //     score += commonInterests * 10;

    //     // Same City
    //     if (
    //       candidate.city === myProfile.city
    //     ) {
    //       score += 20;
    //     }

    //     // Children Preference
    //     if (
    //       candidate.wantsChildren ===
    //       myProfile.wantsChildren
    //     ) {
    //       score += 20;
    //     }

    //     // Relocation Preference
    //     if (
    //       candidate.willingToRelocate ===
    //       myProfile.willingToRelocate
    //     ) {
    //       score += 15;
    //     }

    //     // Family Preference
    //     if (
    //       candidate.familyPreference ===
    //       myProfile.familyPreference
    //     ) {
    //       score += 15;
    //     }

    //     return {
    //       profile: candidate,
    //       score,
    //     };
    //   }
    // );

    const recommendations = await Promise.all(
      candidates.map(async (candidate) => {
        const businessScore = calculateBusinessScore(myProfile, candidate);

        let aiScore = 50;

        try {
          const ai = await getCompatibilityScore(myProfile, candidate);

          aiScore = ai.score;
        } catch (err) {
          console.log("AI failed");
        }

        const finalScore = Math.round(businessScore * 0.7 + aiScore * 0.3);

        return {
          profile: candidate,

          businessScore,

          aiScore,

          finalScore,

          label:
            finalScore >= 90
              ? "Exceptional Match"
              : finalScore >= 80
                ? "High Potential Match"
                : finalScore >= 70
                  ? "Good Compatibility"
                  : "Explore Further",
        };
      }),
    );

    // recommendations.sort(
    //   (a, b) => b.score - a.score
    // );
    recommendations.sort((a, b) => b.finalScore - a.finalScore);

    res.status(200).json({
      success: true,
      data: recommendations.slice(0, 20),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getConnections = async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "name email")
      .populate("user2", "name email");

    const connections = matches.map((match) => {
      const otherUser =
        match.user1._id.toString() === userId ? match.user2 : match.user1;

      return {
        matchId: match._id,
        userId: otherUser._id,
        name: otherUser.name,
        email: otherUser.email,
        score: match.score,
        explanation: match.explanation,
      };
    });

    res.status(200).json({
      success: true,
      count: connections.length,
      data: connections,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
