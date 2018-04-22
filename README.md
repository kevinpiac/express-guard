# Express Guard


[![Build Status](https://travis-ci.org/kevinpiac/express-guard.svg?branch=dev)](https://travis-ci.org/kevinpiac/express-guard)
[![Coverage Status](https://coveralls.io/repos/github/kevinpiac/express-guard/badge.svg?branch=dev)](https://coveralls.io/github/kevinpiac/express-guard?branch=dev)

<p align="center">
  <img src="logo.jpg">
</p>

Express Guard (express-guard) allows you to manage the requests made to your express server. It's built to be simple and has a powerful syntax. With Express Guard, you only have to define allowed Features (such as 'viewPosts', 'removePost'...) for different user Roles (such as 'admin', 'postOwner'). Then when a request is made to your server, the middleware will check the corresponding access policy and return a result based on the user's permissions.


### STATUS: Under active development

## Getting started

#### 1. Import Guard and define your roles

``` js
const Guard = require('express-guard');

const authenticated = new Guard.Role('authenticated', {
  can: ['viewPost', 'editPost', 'logout'],
  func(req) {
    return !!(req.user.id);
  },
})

// because we define roles one by one, we can use
// role defined above to calculate this one...
const anyone = new Guard.Role('anyone', {
  can: ['login'],
  func(req) { return authenticated.func(req); },
});

```

#### 2. Add your roles to guard instance

```js
const guard = new Guard();

// add roles one by one
guard.roles.addRole(anyone);
guard.roles.addRole(authenticated);


// or using an array
guard.roles = [anyone, authenticated];
```

#### 3. Use the guard middlewares
```js
const app = express();
const router = express.Router();

// example 1
// we allow access only if user
// has roles allowing to viewPost OR editPost
router.get('/posts', [
  guard.requireAny('viewPost', 'editPost'),
], (req, res) => {
  // your route handler
});

// example 2
// we allow access only if user
// has roles allowing to viewPost AND editPost
router.get('/posts', [
  guard.requireAll('viewPost', 'editPost'),
], (req, res) => {
  // your route handler
});
```
