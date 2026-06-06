// POST /api/likes

// POST /api/pass
const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const { likeUser, passUser } = require("../controllers/likeController");

router.post("/", auth, likeUser);

router.post("/pass", auth, passUser);

module.exports = router;
