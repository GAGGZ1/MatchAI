const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  getRecommendations,
  getConnections,
} = require("../controllers/matchController");

router.get("/", auth, getRecommendations);

router.get("/connections", auth, getConnections);

module.exports = router;
