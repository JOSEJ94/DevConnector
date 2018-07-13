const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests posts router
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

module.exports = router;