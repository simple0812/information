var router = express.Router();
var apiCtrl = require('../controllers/api');

router.get('/apis', apiCtrl.retrieve);

module.exports = router;