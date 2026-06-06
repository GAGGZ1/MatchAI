const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    firstName: String,
    lastName: String,

    gender: String,
    dateOfBirth: Date,
    age: Number,

    country: String,
    state: String,
    city: String,

    height: String,
    weight: String,

    religion: String,
    caste: String,
    motherTongue: String,

    highestEducation: String,
    degree: String,
    college: String,

    company: String,
    designation: String,
    income: String,

    maritalStatus: String,

    languagesKnown: [String],

    familyType: {
      type: String,
      enum: ["Nuclear", "Joint", "No Preference"],
      default: "No Preference",
    },
    siblingsCount: Number,

    wantsChildren: {
      type: Boolean,
      default: true,
    },

    openToRelocate: {
      type: Boolean,
      default: false,
    },

    openToPets: {
      type: Boolean,
      default: false,
    },

    interests: [String],

    personality: {
      introvert: Number,
      career: Number,
      adventure: Number,
    },

    relationshipGoal: String,

    dealBreakers: [String],

    aboutMe: String,

    lookingFor: String,
    profession: String,
    bio: String,
    willingToRelocate: {
      type: Boolean,
      default: false,
    },
    familyPreference: {
      type: String,
      enum: ["Nuclear", "Joint", "No Preference"],
      default: "No Preference",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Profile", profileSchema);
