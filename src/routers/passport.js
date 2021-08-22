const Router = require("@koa/router");

const router = Router({
  prefix: "/api/passport",
});

const userControl = require("../controllers/passport");
const messageCodeControl = require("../controllers/messageCodeController");

router.post(
  "/register",
  messageCodeControl.checkMessageCode,
  userControl.register
);
router.post("/login", userControl.login);

module.exports = router.routes();
