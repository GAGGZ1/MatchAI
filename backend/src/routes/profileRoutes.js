const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createProfile,
  getProfileById,
} = require("../controllers/profileController");

router.post("/", auth, createProfile);

router.get("/:id", auth, getProfileById);

module.exports = router;
