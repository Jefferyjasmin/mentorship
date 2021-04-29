const express = require("express");
const router = express.Router();
// @route    Get api/post/test
// @desc     test post route
// @access   public
router.get("/test", (req, res) => res.json({ meg: " posts works" }));

module.exports = router;
