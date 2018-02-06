const Router = require('koa-router');
const getClasses = require('../controller/getClassController');

const router = new Router();
router.get('/getClasses', getClasses);
module.exports = router;