const Router = require("@koa/router");

const router = Router({
  prefix: "/api/passport",
});

const userControl = require("../controllers/passport");

router.post("/register", userControl.register);
router.post("/login", userControl.login);

module.exports = router.routes();
