const Router = require('@koa/router');

const router = new Router({
  prefix: '/file/upload'
})

const fileUploadController = require('../controllers/fileUploadController');

router.post('/', fileUploadController.filesUpload);

module.exports = router.routes();
