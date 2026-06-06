const router =
  require("express").Router();

const auth =
  require("../middleware/authMiddleware");

const {
  compatibility,
   generateIntro,
} = require("../controllers/aiController");

router.post(
  "/compatibility",
  auth,
  compatibility
);
router.post(
  "/intro",
  auth,
  generateIntro
);

module.exports = router;