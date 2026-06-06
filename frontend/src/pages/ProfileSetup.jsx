import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileSetup() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      gender: "Male",
      dateOfBirth: "",
      age: "",
      country: "",
      state: "",
      city: "",
      height: "",
      weight: "",
      religion: "",
      caste: "",
      motherTongue: "",
      highestEducation: "",
      degree: "",
      college: "",
      company: "",
      designation: "",
      income: "",
      maritalStatus: "Single",
      languagesKnown: "",
      familyType: "No Preference",
      siblingsCount: "",
      wantsChildren: true,
      openToRelocate: false,
      openToPets: false,
      interests: "",
      personality: {
        introvert: 5,
        career: 5,
        adventure: 5
      },
      relationshipGoal: "",
      dealBreakers: "",
      aboutMe: "",
      lookingFor: "Female",
      profession: "",
      bio: "",
      willingToRelocate: false,
      familyPreference: "No Preference",
    });

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    if (name.includes("personality.")) {
      const personalityKey = name.split(".")[1];
      setFormData({
        ...formData,
        personality: {
          ...formData.personality,
          [personalityKey]: parseInt(value) || 0
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          value === "true"
            ? true
            : value === "false"
            ? false
            : value,
      });
    }

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/profile",
          {
            ...formData,

            interests:
              formData.interests
                .split(",")
                .map((i) =>
                  i.trim()
                )
                .filter(i => i),

            languagesKnown:
              formData.languagesKnown
                .split(",")
                .map((l) =>
                  l.trim()
                )
                .filter(l => l),

            dealBreakers:
              formData.dealBreakers
                .split(",")
                .map((d) =>
                  d.trim()
                )
                .filter(d => d),
          }
        );

     toast.success(
  "Profile Saved Successfully"
);

        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

      toast.error(
  "Profile Save Failed"
);

      }

    };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-pink-50
        via-white
        to-purple-50
        flex
        justify-center
        py-10
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          p-8
          w-full
          max-w-2xl
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-pink-600
            mb-2
          "
        >
          ❤️ Profile Setup
        </h1>

        <p
          className="
            text-gray-500
            mb-8
          "
        >
          Tell us about yourself
          to find better matches
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-96 overflow-y-auto pr-4"
        >
          {/* Personal Information */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Personal Information</h3>
          
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <div>
            <label className="block mb-2 font-semibold">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Location */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Location</h3>

          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="state"
            type="text"
            placeholder="State/Province"
            value={formData.state}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Physical Attributes */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Physical Attributes</h3>

          <input
            name="height"
            type="text"
            placeholder="Height (e.g., 5'10&quot;)"
            value={formData.height}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="weight"
            type="text"
            placeholder="Weight (e.g., 70 kg)"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Cultural Background */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Cultural Background</h3>

          <input
            name="religion"
            type="text"
            placeholder="Religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="caste"
            type="text"
            placeholder="Caste"
            value={formData.caste}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="motherTongue"
            type="text"
            placeholder="Mother Tongue"
            value={formData.motherTongue}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="languagesKnown"
            type="text"
            placeholder="Languages Known (comma-separated)"
            value={formData.languagesKnown}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Education */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Education</h3>

          <input
            name="highestEducation"
            type="text"
            placeholder="Highest Education Level"
            value={formData.highestEducation}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="degree"
            type="text"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="college"
            type="text"
            placeholder="College/University"
            value={formData.college}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Career */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Career</h3>

          <input
            name="company"
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="designation"
            type="text"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="income"
            type="text"
            placeholder="Annual Income (Optional)"
            value={formData.income}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* Family & Lifestyle */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Family & Lifestyle</h3>

          <div>
            <label className="block mb-2 font-semibold">Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Single</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Prefer Not to Say</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Family Type</label>
            <select
              name="familyType"
              value={formData.familyType}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Nuclear</option>
              <option>Joint</option>
              <option>No Preference</option>
            </select>
          </div>

          <input
            name="siblingsCount"
            type="number"
            placeholder="Number of Siblings"
            value={formData.siblingsCount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <div>
            <label className="block mb-2 font-semibold">Wants Children</label>
            <select
              name="wantsChildren"
              value={formData.wantsChildren}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
              <option>Unsure</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Open to Relocate</label>
            <select
              name="openToRelocate"
              value={formData.openToRelocate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Open to Pets</label>
            <select
              name="openToPets"
              value={formData.openToPets}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* Interests & Personality */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Interests & Personality</h3>

          <input
            name="interests"
            placeholder="Interests (comma-separated: Coding, Travel, Reading)"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <div>
            <label className="block mb-2 font-semibold">Introvert Level (1-10)</label>
            <input
              name="personality.introvert"
              type="range"
              min="1"
              max="10"
              value={formData.personality.introvert}
              onChange={handleChange}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{formData.personality.introvert}</span>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Career Focus (1-10)</label>
            <input
              name="personality.career"
              type="range"
              min="1"
              max="10"
              value={formData.personality.career}
              onChange={handleChange}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{formData.personality.career}</span>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Adventure Level (1-10)</label>
            <input
              name="personality.adventure"
              type="range"
              min="1"
              max="10"
              value={formData.personality.adventure}
              onChange={handleChange}
              className="w-full"
            />
            <span className="text-sm text-gray-500">{formData.personality.adventure}</span>
          </div>

          {/* Relationship Preferences */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">Relationship Preferences</h3>

          <div>
            <label className="block mb-2 font-semibold">Looking For</label>
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <input
            name="relationshipGoal"
            type="text"
            placeholder="Relationship Goal (e.g., Marriage, Long-term Dating)"
            value={formData.relationshipGoal}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="dealBreakers"
            placeholder="Deal Breakers (comma-separated)"
            value={formData.dealBreakers}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* About Me */}
          <h3 className="text-xl font-semibold text-pink-600 mt-6 mb-3">About You</h3>

          <textarea
            name="aboutMe"
            placeholder="Tell us about yourself"
            value={formData.aboutMe}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg h-24"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg h-20"
          />

          {/* Additional */}
          <div>
            <label className="block mb-2 font-semibold">Willing To Relocate</label>
            <select
              name="willingToRelocate"
              value={formData.willingToRelocate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Family Preference</label>
            <select
              name="familyPreference"
              value={formData.familyPreference}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option>Nuclear</option>
              <option>Joint</option>
              <option>No Preference</option>
            </select>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-pink-500
              text-white
              py-3
              rounded-lg
              font-semibold
              hover:bg-pink-600
              sticky
              bottom-0
            "
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;