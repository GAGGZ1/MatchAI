import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function ProfileDetails() {

  const { id } = useParams();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {

      try {

        const res =
          await api.get(
            `/profile/${id}`
          );

        setProfile(
          res.data.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  if (!profile) {

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
            Loading Profile...
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
        <div
          className="
            max-w-4xl
            mx-auto
            bg-white
            rounded-2xl
            shadow-xl
            p-8
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >
            <div
              className="
                w-24
                h-24
                rounded-full
                bg-pink-100
                flex
                items-center
                justify-center
                text-5xl
              "
            >
              👤
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {profile.firstName} {profile.lastName}
              </h1>

              <p className="text-gray-500">
                {profile.profession || profile.designation}
              </p>

              <p className="text-gray-400">
                {profile.city}, {profile.state}
              </p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p className="font-semibold text-lg">{profile.age}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <p className="font-semibold text-lg">{profile.gender}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Date of Birth</p>
                <p className="font-semibold text-lg">
                  {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Marital Status</p>
                <p className="font-semibold text-lg">{profile.maritalStatus}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Religion</p>
                <p className="font-semibold text-lg">{profile.religion || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Caste</p>
                <p className="font-semibold text-lg">{profile.caste || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Location</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Country</p>
                <p className="font-semibold text-lg">{profile.country}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">State/Province</p>
                <p className="font-semibold text-lg">{profile.state}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">City</p>
                <p className="font-semibold text-lg">{profile.city}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Open to Relocate</p>
                <p className="font-semibold text-lg">{profile.openToRelocate ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Physical Attributes</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Height</p>
                <p className="font-semibold text-lg">{profile.height || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Weight</p>
                <p className="font-semibold text-lg">{profile.weight || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Education</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Highest Education</p>
                <p className="font-semibold text-lg">{profile.highestEducation || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Degree</p>
                <p className="font-semibold text-lg">{profile.degree || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 text-sm">College/University</p>
                <p className="font-semibold text-lg">{profile.college || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Career */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Career</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Company</p>
                <p className="font-semibold text-lg">{profile.company || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Designation</p>
                <p className="font-semibold text-lg">{profile.designation || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Profession</p>
                <p className="font-semibold text-lg">{profile.profession || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Annual Income</p>
                <p className="font-semibold text-lg">{profile.income || "Not Disclosed"}</p>
              </div>
            </div>
          </div>

          {/* Cultural & Languages */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Languages & Culture</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Mother Tongue</p>
                <p className="font-semibold text-lg">{profile.motherTongue || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Languages Known</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {profile.languagesKnown && profile.languagesKnown.length > 0 ? (
                    profile.languagesKnown.map((lang, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Family */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Family</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Family Type</p>
                <p className="font-semibold text-lg">{profile.familyType}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Number of Siblings</p>
                <p className="font-semibold text-lg">{profile.siblingsCount || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Wants Children</p>
                <p className="font-semibold text-lg">{profile.wantsChildren ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Open to Pets</p>
                <p className="font-semibold text-lg">{profile.openToPets ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Interests</h2>
            <div className="flex gap-3 flex-wrap">
              {profile.interests && profile.interests.length > 0 ? (
                profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No interests added</span>
              )}
            </div>
          </div>

          {/* Personality */}
          {profile.personality && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Personality</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm">Introvert Level</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full"
                        style={{ width: `${(profile.personality.introvert / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{profile.personality.introvert}/10</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Career Focus</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(profile.personality.career / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{profile.personality.career}/10</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Adventure Level</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(profile.personality.adventure / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{profile.personality.adventure}/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Relationship Preferences */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Relationship Preferences</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Looking For</p>
                <p className="font-semibold text-lg">{profile.lookingFor}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Relationship Goal</p>
                <p className="font-semibold text-lg">{profile.relationshipGoal || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Deal Breakers */}
          {profile.dealBreakers && profile.dealBreakers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Deal Breakers</h2>
              <div className="flex gap-3 flex-wrap">
                {profile.dealBreakers.map((breaker, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
                  >
                    {breaker}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.aboutMe || profile.bio || "No information provided"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;