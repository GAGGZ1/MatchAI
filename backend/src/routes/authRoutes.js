// POST /api/auth/register

// POST /api/auth/login

// GET /api/auth/me
const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  register,
  login,
  getMe
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/me",
  auth,
  getMe
);
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully"
  });
});

module.exports = router;