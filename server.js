const express = require('express')
const app = express()
var request = require('request')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
var loggedIn = null;

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
  loggedIn = null;
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

  request.post({url: 'https://gpodder.net/api/2/auth/'+ username +'/login.json', jar: j}, function(e,r,body){

    if (r.statusCode === 200){

      res.cookie('username', username)
      loggedIn = true;
      res.redirect('/index.html')

    } else{

      res.redirect('/login.html')

    }

  }).auth(req.body.username, req.body.password, false)



})

app.use((req, res, next) => shouldAuthenticate(req) ? isAuthenticated(req, res, next) : next())

function shouldAuthenticate(req){
  var authPaths = ["/","/index.html", "/popular.html", "subscriptions.html", "categories.html"]
  if(authPaths.includes(req.path)){
    return true;
  } else  return false;
}

function isAuthenticated(req, res, next) {

  if (loggedIn === null){
    res.redirect("/login.html");
    //next();
  }
  next();
}

//app.use(isAuthenticated())
app.use(express.static('PublicFiles'))
app.listen(process.env.PORT || 8000);
