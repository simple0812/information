var router = express.Router();
var newsCtrl = require('../controllers/news');

router.get('/news', newsCtrl.retrieve);
// router.get('/news/:uid', newsCtrl.getNewsByUserId);
router.post('/new', newsCtrl.create)
router.put('/new', newsCtrl.update)
router.delete('/new', newsCtrl.delete)

module.exports = router;