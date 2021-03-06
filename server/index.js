const PORT = process.env.PORT || 8080;
const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./db');

const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const { clientId, clientSecret } = require('./secrets')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = app

dbStore.sync();

app.use(morgan('dev'))

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

const googleConfig = {
  clientID: clientId,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback'
};

const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({where: { googleId: googleId  }})
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

passport.use(strategy);

app.use('/api', require('./api'))

app.use((req, res, next) => {
  const error = Error('page not found');
  error.status = 404;
  next(error);
})



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html'))
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})


 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

