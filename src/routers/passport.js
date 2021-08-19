const Router = require("@koa/router");

const router = Router({
  prefix: "/api/passport",
});

const userControl = require("../controllers/passport");

router.post("/", userControl.register);

module.exports = router.routes();
