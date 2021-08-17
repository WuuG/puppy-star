const Router = require('@koa/router');

const router = Router({
  prefix: '/api/messageCode'
});

const messageCodeController = require('../controllers/messageCodeController');

router.post('/sendMessageCode', messageCodeController.sendMessageCode);
router.post('/checkMessageCode', messageCodeController.checkMessageCode);

module.exports = router.routes();
