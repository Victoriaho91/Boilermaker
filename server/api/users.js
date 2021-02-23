
const router = require('express').Router();
const passport = require('passport')

// // matches GET requests to /api/users/
// router.get('/', function (req, res, next) { /* etc */});


// //Redirect When User Petitions to Use OAuth:

// router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

// //Once our user "signs the contract" with Google, google will make a request to the callback that we've configured with them. Write a route to handle GET requests to this callback:

// router.get('/auth/google/callback', passport.authenticate('google', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

// // Our client will make this request every time the client application loads - this allows us to keep the user logged in on the client even after they refresh.

// router.get('/me', (req, res, next) => {
//   res.json(req.user);
// });

// // matches POST requests to /api/users/
// router.post('/', function (req, res, next) { /* etc */});


// // matches PUT requests to /api/users/:userId
// router.put('/:userId', function (req, res, next) { /* etc */});


// // matches DELETE requests to /api/kittens/:kittenId
// router.delete('/:userId', function (req, res, next) { /* etc */});

// //Delete logs user out, ends session
// router.delete('/logout', (req, res, next) => {
//   req.logout();
//   req.session.destroy()
//   res.sendStatus(204);
// });

// //POST creates user
// router.post('/signup', (req, res, next) => {
//   User.create(req.body)
//     .then(user => {
//       req.login(user, err => {
//         if (err) next(err);
//         else res.json(user);
//       });
//     })
//     .catch(next);
// });

// //PUT Login
// router.put('/login', (req, res, next) => {
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//     .then(user => {
//       if (!user) res.status(401).send('User not found');
//       else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
//       else {
//         req.login(user, err => {
//           if (err) next(err);
//           else res.json(user);
//         });
//       }
//     })
//     .catch(next);
// });

module.exports = router;
