
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const internalIp = require('internal-ip');
const express = require('express');
const webpack = require('webpack');
const path = require('path');

const app = express();
const compiler = webpack(config);

const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  silent: false,
  stats: { color: true }
});

const port = 8080;
const ip = internalIp.v4();

let _users = require('./backend/account/user');
let _monitor = require('./backend/monitor/monitor');

const _passport = require('passport');
const Strategy = require('passport-local').Strategy;
const _bodyParser = require('body-parser');
const _cookieParser = require('cookie-parser');

const _add = require('./backend/processor/addData');

let _cache = [];
_monitor.start(_cache);

_passport.use(new Strategy(
  (username, password, cb) => {
    _users.findByUsername(username, (err, user)=>{
      if ( err ) { cb(null, false); }
      if ( !user ) { cb(null, false); }
      if ( user.password != password ) { cb(null, false); }
      cb(null, user);
    });
  }
));


_passport.serializeUser((user, cb)=>{
  cb(null, user.id);
});

_passport.deserializeUser((id, cb)=>{
  _users.findById(id, (err, user)=>{
    if ( err ) { cb(err); }
    cb(null, user);
  });
});

app.use(_bodyParser.json());
app.use(_bodyParser.urlencoded({ extended: false }));
app.use(_cookieParser());
app.use(require('express-session')({
  secret: '!@J03nil@lg@123.',
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.initialize());
app.use(_passport.session());
app.use('/public', express.static(path.join(__dirname, './src/public')));

app.use(middleware);
app.use(webpackHotMiddleware(compiler));


/**
 * @description URL for the main adnalytics mananager
 */
app.get('/manager', (req, res) => {
  req.login(req.user, (err)=>{
    if ( err ) {
      res.redirect('/login');
      //res.sendFile(path.join(__dirname, './src/public/login/index.html'));
    } else {
      res.sendFile(path.join(__dirname, './src/www/index.html'));
    }
  });

});

/**
 * @description URL for get request in login
 */
app.get('/login', (req, res) => {
  req.login(req.user, (err)=>{
    if (err) {
      res.sendFile(path.join(__dirname, './src/public/login/index.html'));
    }
    else {
      res.redirect('/adnalytics/manager');
    }
  });
});

/**
 * @description URL for post request for login
 */
app.post('/login',
  _passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/manager'
  })
);

/**
 * @description URL to handle logout request
 */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

/**
 * @description URL to handle register request
 */
app.post('/register', (req, res) => {
  console.log('Query', req.query);
  console.log('Body', req.body);
  res.send('Registered');
});

/**
 * @description URL for the website
 */
app.get('/', (req, res) => {
  res.send('Website');
});

/****************************************************************
 * API
 ****************************************************************/

app.post('/api/add', (req, res)=> {
  _add.add(req.body, function (data) {
    _cache = _cache.concat(data);
    _monitor.update(_cache);
    res.send('Add');
  });
  
});

app.get('/api/data', (req, res) => {
  res.send(_cache)
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(' --------------------------------------');
  console.log(`    Local: http://0.0.0.0:${port}`);
  console.log(` External: http://${ip}:${port}`);
  console.log(' --------------------------------------');
});
