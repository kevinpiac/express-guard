# Express Guard


[![Build Status](https://travis-ci.org/kevinpiac/express-guard.svg?branch=master)](https://travis-ci.org/kevinpiac/express-guard)
[![Coverage Status](https://coveralls.io/repos/github/kevinpiac/express-guard/badge.svg?branch=master)](https://coveralls.io/github/kevinpiac/express-guard?branch=dev)

<p align="center">
  <img src="logo.jpg">
</p>

Express Guard (express-guard) allows you to manage the requests made to your express server. It's built to be simple and has a powerful syntax.

With Express Guard, you only have to define allowed Features (such as 'viewPosts', 'removePost'...) for different user Roles (such as 'admin', 'postOwner').

Then when a request is made to your server, the middleware will check the corresponding access policy and return a result based on the user's permissions.

## Getting started

#### 1. Import Guard and define your roles

``` js
const Guard = require('express-guard');

const authenticated = new Guard.Role('authenticated', {
  can: ['viewPost', 'editPost', 'logout'],
  func: async (req) => {
    // Perform some logic to compute your role policy.
    const result = await Promise.resolve('someresult');
    if (result === 'someresult') {
      return true; // will have role 'authenticated'
    }
    return false; // will not match this role
  },
})

const guest = new Guard.Role('guest', {
  can: ['login'], // they can't do anything except login
  func: async (req) => {
    // because we define roles one by one, we can use
    // a previously defined role to compute this one.
    // Here a guest is someone who is not authenticated.
    const res = await !authenticated.func(req);
    return res;
  },
})

// Because we define roles one by one, we can use
// a previously defined role to compute this one.
const admin = new Guard.Role('admin', {
  can: ['*'], // An admin can do everything!
  func(req) { return unauthenticated.func(req); },
});

```

#### 2. Add your roles to guard instance

```js
const guard = new Guard();

// Add roles one by one
guard.roles.addRole(authenticated);
guard.roles.addRole(admin);


// Or using an array
guard.roles = [authenticated, admin];
```

#### 3. Use guard middleware
```js
const app = express();
const router = express.Router();

// example 1
// regarding our config both admin and authenticated users
// have access to this route.
router.get('/posts',
guard.requireAny('viewPost', '*'),
(req, res) => {
  // your route handler
});

// example 2
// regarding our config, only admin has access to this route
router.delete('/posts/:postId',
guard.requireAny('removePost', '*'),
(req, res) => {
  // your route handler
});
```
