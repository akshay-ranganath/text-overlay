var express = require('express')
var router = express.Router()

/* GET home page. */
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('overlay', { title: 'Express' })
})

module.exports = router
