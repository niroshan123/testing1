var express = require('express');
var router = express.Router();
var User = require('../models/user');

//mport {mailhandlerpasswordreset,mailhandleremailconfirm} from './config'
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


const emailhandler = require("./config");

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  emailhandler.mailhandlerpasswordreset('hahaha','121212')

  var user = new User({
    email: req.body.email,
//    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
module.exports = router;