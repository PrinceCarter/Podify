const express = require('express')
const app = express()
var request = require('request')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var request = request.defaults({jar: true})
var j = request.jar()
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var username;



// Logout the user
app.get('/logout', function (req, res) {

  request.post({url: 'https://gpodder.net/api/2/auth/'+ username +'/logout.json', jar: j},function(e,r,body){

  res.redirect('/login.html')

  })

})

// Get User Subscriptions
app.get('/subscriptions', function(req, res){

  request.get({url: 'https://gpodder.net/subscriptions/'+ username +'.json', jar: j}, function(e,r,body){

    res.send(body)

  })

})

// Get User Suggestions
app.get('/suggestions', function(req, res){

  request.get({url: 'https://gpodder.net/suggestions/6.json', jar: j}, function(e,r,body){

    res.send(body)

  })

})

// Login the user via HTTP Basic Auth
app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  username = req.body.username;

  var cookie = request.post({url: 'https://gpodder.net/api/2/auth/'+ username +'/login.json', jar: j}, function(e,r,body){

  }).auth(req.body.username, req.body.password, false)

  res.cookie('username', username)

  console.log(req.cookies)

  res.redirect('/index.html')

})



function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  // if (req.body.username.authenticated)
  //     return next();
  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/login.html');
}

//app.use(isAuthenticated())

app.use(express.static('PublicFiles'))

app.use(cookieParser())

app.listen(process.env.PORT || 8000);
