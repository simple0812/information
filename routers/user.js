var router = express.Router();
var userCtrl = require('../controllers/user')

router.get('/users', userCtrl.retrieve)
router.post('/user', userCtrl.create)
router.put('/user', userCtrl.update)
router.delete('/user', userCtrl.delete)
// router.put('/user', userCtrl.update)

module.exports = router;