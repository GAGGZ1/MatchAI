require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Profile = require("./models/profile");
const bcrypt =
  require("bcryptjs");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// Data arrays for diverse seed data
const firstNamesMale = [
  "Arjun", "Rohan", "Aditya", "Vikram", "Sanjay", "Akshay", "Rajeev", "Karan", "Nikhil", "Ravi",
  "Abhishek", "Harshit", "Manish", "Ashish", "Rajesh", "Suresh", "Vinay", "Ajay", "Amit", "Ankit",
  "Aryan", "Ayush", "Bhavesh", "Chirag", "Deepak", "Dhruv", "Divyanshu", "Eka", "Eklavya", "Eshaan",
  "Farhan", "Gaurav", "Girish", "Govind", "Gyan", "Harsh", "Hemant", "Himanshu", "Hiren", "Ishan",
  "Jatin", "Jaswant", "Javed", "Jeet", "Jenil", "Jigar", "Jitesh", "Joydeep", "Kailash", "Kalash",
  "Kamal", "Kamran", "Kanak", "Kanishk", "Karan", "Karneesh", "Karun", "Kaushik", "Kavi", "Kavin",
  "Keshav", "Ketan", "Ketul", "Kiran", "Kishor", "Kshitij", "Kumar", "Kunal", "Kundan", "Kuresh",
  "Kushal", "Lakshmanan", "Laxman", "Lekhraj", "Likhit", "Lokesh", "Madhav", "Madhu", "Mahendra", "Mahesh"
];

const firstNamesFemale = [
  "Priya", "Anjali", "Neha", "Deepika", "Shruti", "Sakshi", "Pooja", "Divya", "Aadhya", "Aisha",
  "Akanksha", "Amara", "Ambika", "Amira", "Amita", "Amruta", "Amy", "Ananya", "Anaya", "Aneka",
  "Anisha", "Anita", "Anjana", "Anmol", "Annu", "Ananya", "Anshu", "Antara", "Anu", "Anuja",
  "Anushka", "Anushree", "Anuya", "Anvi", "Aparna", "Apeksha", "Apoorva", "Aprajita", "Apratim", "Apri",
  "Apsara", "Apshara", "Apti", "Aqsa", "Aquila", "Ara", "Arabella", "Araceli", "Arada", "Arah",
  "Arai", "Aral", "Aram", "Arana", "Arani", "Aranya", "Arapata", "Aratrika", "Aratrika", "Arauja",
  "Araya", "Arbi", "Arbisha", "Arbuda", "Arca", "Arcana", "Archangela", "Archana", "Archeni", "Archie",
  "Archisha", "Archita", "Architha", "Arci", "Arcie", "Arcilla", "Arcina", "Arcina", "Arcisa", "Arda"
];

const lastNames = [
  "Sharma", "Singh", "Patel", "Kumar", "Gupta", "Verma", "Yadav", "Reddy", "Menon", "Nair",
  "Desai", "Chopra", "Bhat", "Rao", "Kulkarni", "Pandey", "Tiwari", "Tripathi", "Mishra", "Sinha",
  "Roy", "Das", "Dey", "Banerjee", "Bhattacharya", "Mukherjee", "Chatterjee", "Nath", "Bose", "Dutta"
];

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Chandigarh", "Indore", "Surat", "Nagpur", "Thiruvananthapuram", "Kochi", "Goa", "Visakhapatnam"
];

const states = {
  "Mumbai": "Maharashtra", "Pune": "Maharashtra", "Indore": "Madhya Pradesh",
  "Delhi": "Delhi", "Chandigarh": "Chandigarh",
  "Bangalore": "Karnataka", "Thiruvananthapuram": "Kerala", "Kochi": "Kerala",
  "Hyderabad": "Telangana", "Visakhapatnam": "Andhra Pradesh",
  "Chennai": "Tamil Nadu",
  "Kolkata": "West Bengal",
  "Ahmedabad": "Gujarat", "Surat": "Gujarat",
  "Jaipur": "Rajasthan",
  "Lucknow": "Uttar Pradesh",
  "Nagpur": "Maharashtra",
  "Goa": "Goa"
};

const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain"];
const castes = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "General"];
const motherTongues = ["Hindi", "Marathi", "Telugu", "Tamil", "Kannada", "Malayalam", "Punjabi", "Gujarati", "Bengali", "Odia"];

const educations = ["High School", "Bachelor's", "Master's", "PhD", "Diploma", "MBA"];
const degrees = ["B.Tech", "B.Sc", "B.A", "B.Com", "M.Tech", "M.Sc", "MBA", "CA"];
const colleges = [
  "IIT Mumbai", "IIT Delhi", "Delhi University", "Mumbai University", "Bangalore University",
  "Anna University", "Jadavpur University", "BITS Pilani", "VIT", "Symbiosis"
];

const companies = [
  "TCS", "Infosys", "Wipro", "HCL", "Accenture", "Google", "Microsoft", "Amazon", "Apple", "IBM",
  "Cognizant", "Capgemini", "Tech Mahindra", "Mindtree", "Flipkart", "Ola", "Uber", "Swiggy"
];

const designations = [
  "Software Engineer", "Senior Software Engineer", "Lead Engineer", "Manager", "Product Manager",
  "Data Scientist", "Data Analyst", "DevOps Engineer", "UI/UX Designer", "Business Analyst",
  "Consultant", "Architect", "VP Engineering", "Director", "CEO"
];

const incomes = ["2-5L", "5-10L", "10-20L", "20-30L", "30-50L", "50L+"];
const maritalStatuses = ["Never Married", "Divorced", "Widowed"];

const languagesArray = [
  ["English", "Hindi"], ["English", "Hindi", "Marathi"], ["English", "Hindi", "Tamil"],
  ["English", "Hindi", "Telugu"], ["English", "Kannada"], ["English", "Malayalam"],
  ["English", "Bengali"], ["English", "Punjabi"], ["English", "Gujarati"]
];

const interests = [
  "Reading", "Traveling", "Cooking", "Fitness", "Movies", "Music", "Sports", "Yoga", "Meditation",
  "Painting", "Photography", "Dance", "Swimming", "Hiking", "Cycling", "Gaming", "Technology",
  "Art", "Theater", "Gardening", "Volunteering", "Socializing", "Board Games", "Podcast Listening"
];

const professions = ["Engineer", "Doctor", "Lawyer", "Teacher", "Entrepreneur", "Designer", "Artist", "Consultant", "Manager", "Analyst"];
const relationshipGoals = ["Marriage", "Long-term relationship", "Casual dating", "Not sure yet"];
const dealBreakerExamples = [
  ["Smoking", "Drinking"], ["No family planning"], ["Don't want children"],
  ["Gambling"], ["Poor communication"], ["No ambition"], ["Excessive social media"]
];

const heights = ["5'0\"", "5'2\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\""];
const weights = ["45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg"];

const generateRandomDate = (startYear, endYear) => {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomElements = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateSeedUsers = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Profile.deleteMany({});
    console.log("Cleared existing data");

    const users = [];
    const profiles = [];

    // Generate 100 male users
    for (let i = 1; i <= 100; i++) {
      const firstName = getRandomElement(firstNamesMale);
      const lastName = getRandomElement(lastNames);
      const email = `male_user_${i}@matchai.com`;
      const password = await bcrypt.hash("password123", 10);

      const user = {
        name: `${firstName} ${lastName}`,
        email,
        password
      };
      users.push(user);

      const city = getRandomElement(cities);
      const state = states[city];
      const dob = generateRandomDate(1990, 2005);
      const age = new Date().getFullYear() - dob.getFullYear();

      const profile = {
        firstName,
        lastName,
        gender: "Male",
        dateOfBirth: dob,
        age,
        country: "India",
        state,
        city,
        height: getRandomElement(heights),
        weight: getRandomElement(weights),
        religion: getRandomElement(religions),
        caste: getRandomElement(castes),
        motherTongue: getRandomElement(motherTongues),
        highestEducation: getRandomElement(educations),
        degree: getRandomElement(degrees),
        college: getRandomElement(colleges),
        company: getRandomElement(companies),
        designation: getRandomElement(designations),
        income: getRandomElement(incomes),
        maritalStatus: getRandomElement(maritalStatuses),
        languagesKnown: getRandomElement(languagesArray),
        familyType: getRandomElement(["Nuclear", "Joint", "No Preference"]),
        siblingsCount: Math.floor(Math.random() * 5),
        wantsChildren: Math.random() > 0.5,
        openToRelocate: Math.random() > 0.5,
        openToPets: Math.random() > 0.5,
        interests: getRandomElements(interests, 4),
        personality: {
          introvert: Math.floor(Math.random() * 10),
          career: Math.floor(Math.random() * 10),
          adventure: Math.floor(Math.random() * 10)
        },
        relationshipGoal: getRandomElement(relationshipGoals),
        dealBreakers: getRandomElement(dealBreakerExamples),
        aboutMe: `I'm a ${getRandomElement(designations)} looking for someone with shared interests. I enjoy ${getRandomElements(interests, 2).join(" and ")}.`,
        lookingFor: "Female",
        profession: getRandomElement(professions),
        bio: `Adventure seeker, love ${getRandomElements(interests, 1)[0]}`
      };
      profiles.push(profile);
    }

    // Generate 100 female users
    for (let i = 1; i <= 100; i++) {
      const firstName = getRandomElement(firstNamesFemale);
      const lastName = getRandomElement(lastNames);
      const email = `female_user_${i}@matchai.com`;
      const password = await bcrypt.hash("password123", 10);

      const user = {
        name: `${firstName} ${lastName}`,
        email,
        password
      };
      users.push(user);

      const city = getRandomElement(cities);
      const state = states[city];
      const dob = generateRandomDate(1990, 2005);
      const age = new Date().getFullYear() - dob.getFullYear();

      const profile = {
        firstName,
        lastName,
        gender: "Female",
        dateOfBirth: dob,
        age,
        country: "India",
        state,
        city,
        height: getRandomElement(heights.slice(0, 10)),
        weight: getRandomElement(weights.slice(0, 8)),
        religion: getRandomElement(religions),
        caste: getRandomElement(castes),
        motherTongue: getRandomElement(motherTongues),
        highestEducation: getRandomElement(educations),
        degree: getRandomElement(degrees),
        college: getRandomElement(colleges),
        company: getRandomElement(companies),
        designation: getRandomElement(designations),
        income: getRandomElement(incomes),
        maritalStatus: getRandomElement(maritalStatuses),
        languagesKnown: getRandomElement(languagesArray),
        familyType: getRandomElement(["Nuclear", "Joint", "No Preference"]),
        siblingsCount: Math.floor(Math.random() * 5),
        wantsChildren: Math.random() > 0.5,
        openToRelocate: Math.random() > 0.5,
        openToPets: Math.random() > 0.5,
        interests: getRandomElements(interests, 4),
        personality: {
          introvert: Math.floor(Math.random() * 10),
          career: Math.floor(Math.random() * 10),
          adventure: Math.floor(Math.random() * 10)
        },
        relationshipGoal: getRandomElement(relationshipGoals),
        dealBreakers: getRandomElement(dealBreakerExamples),
        aboutMe: `I'm a ${getRandomElement(designations)} passionate about ${getRandomElements(interests, 2).join(" and ")}. Looking for someone genuine.`,
        lookingFor: "Male",
        profession: getRandomElement(professions),
        bio: `Coffee lover, ${getRandomElements(interests, 1)[0]} enthusiast`
      };
      profiles.push(profile);
    }

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);

    // Link profiles to users
    for (let i = 0; i < profiles.length; i++) {
      profiles[i].userId = createdUsers[i]._id;
    }

    // Insert profiles
    const createdProfiles = await Profile.insertMany(profiles);
    console.log(`Created ${createdProfiles.length} profiles`);

    console.log("✅ Seed data created successfully!");
    console.log(`✅ 100 male users created`);
    console.log(`✅ 100 female users created`);
    console.log("\nLogin credentials (all users):");
    console.log("Password: password123");
    console.log("Emails: male_user_1@matchai.com ... male_user_100@matchai.com");
    console.log("        female_user_1@matchai.com ... female_user_100@matchai.com");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

generateSeedUsers();
