var router = express.Router();
router.get('/', function(req, res) {
	console.log('xxxxx')
	res.send('hello world111111')
});

router.get('/user', function(req, res) {
	res.render('user');
})

router.get('/new', function(req, res) {
	res.render('news');
})

router.get('/api', function(req, res) {
	res.render('api');
})

module.exports = router;