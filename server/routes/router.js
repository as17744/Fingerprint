const Router = require('koa-router');
const getClasses = require('../controller/getClassController');
const addUser = require('../controller/addUserController');

const router = new Router();
router.get('/getClasses', getClasses);
router.get('/add', addUser);
module.exports = router;