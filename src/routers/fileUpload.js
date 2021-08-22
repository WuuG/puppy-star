const Router = require("@koa/router");

const router = new Router({
  prefix: "/api/upload",
});

const fileUploadController = require("../controllers/fileUploadController");
const authControl = require("../controllers/authControl");

router.post("/", authControl.checkPass, fileUploadController.filesUpload);

module.exports = router.routes();
