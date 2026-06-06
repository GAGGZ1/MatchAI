const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Profile = require("./models/Profile");
require("dotenv").config();
mongoose.connect(
  process.env.MONGO_URI
);

const maleNames = [
  "Rahul",
  "Aman",
  "Rohit",
  "Vikas",
  "Karan",
  "Arjun",
  "Deepak",
  "Ankit",
  "Sahil",
  "Nikhil"
];

const femaleNames = [
  "Priya",
  "Neha",
  "Anjali",
  "Pooja",
  "Kriti",
  "Simran",
  "Aditi",
  "Riya",
  "Sneha",
  "Kajal"
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Noida",
  "Gurgaon"
];

const professions = [
  "Software Engineer",
  "Designer",
  "Doctor",
  "Teacher",
  "Manager",
  "Analyst"
];

const interests = [
  "Coding",
  "Travel",
  "Reading",
  "Movies",
  "Fitness",
  "Music"
];

async function seed() {

  await User.deleteMany({});
  await Profile.deleteMany({});

  const password =
    await bcrypt.hash(
      "123456",
      10
    );

  for (
    let i = 1;
    i <= 100;
    i++
  ) {

    const isMale =
      i <= 50;

    const name =
      isMale
        ? maleNames[
            Math.floor(
              Math.random() *
              maleNames.length
            )
          ] + i
        : femaleNames[
            Math.floor(
              Math.random() *
              femaleNames.length
            )
          ] + i;

    const user =
      await User.create({
        name,
        email:
          `${name.toLowerCase()}@gmail.com`,
        password,
      });

    await Profile.create({
      userId: user._id,
      age:
        21 +
        Math.floor(
          Math.random() * 10
        ),

      gender:
        isMale
          ? "Male"
          : "Female",

      lookingFor:
        isMale
          ? "Female"
          : "Male",

      city:
        cities[
          Math.floor(
            Math.random() *
            cities.length
          )
        ],

      profession:
        professions[
          Math.floor(
            Math.random() *
            professions.length
          )
        ],

      interests:
        interests.sort(
          () =>
            0.5 -
            Math.random()
        ).slice(0, 3),

      wantsChildren:
        Math.random() > 0.3,

      willingToRelocate:
        Math.random() > 0.5,

      familyPreference:
        [
          "Nuclear",
          "Joint",
          "No Preference",
        ][
          Math.floor(
            Math.random() * 3
          )
        ],
    });
  }

  console.log(
    "100 Users Created"
  );

  process.exit();
}

seed();