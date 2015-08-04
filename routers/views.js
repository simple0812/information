var router = express.Router();
router.get('/hello', function(req, res) {
	res.send('hello world111111')
});

router.get('/', function(req, res) {
  res.render('user');
});

router.get('/user/v', function(req, res) {
	res.render('user');
})

router.get('/new/v', function(req, res) {
	res.render('news');
})

router.get('/api/v', function(req, res) {
	res.render('api');
})

module.exports = router;