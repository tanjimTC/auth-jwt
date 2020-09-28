const router = require("express").Router();
const verify = require("./privateRoutes");

router.route("/").get(verify, (req, res) => {
  res.json({ posts: { title: "my first post" } });
});

module.exports = router;
