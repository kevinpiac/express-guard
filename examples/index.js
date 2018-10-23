const express = require('express');
const app = express();

const Guard = require('express-guard');
const guard = new Guard();

const anyone = new Guard.Role('anyone', {
  can: ['viewHomePage'],
  func(req) {
    return true;
  },
});

const authenticated = new Guard.Role('authenticated', {
  can: ['viewHomePage', 'viewAuthSection'],
  // example with an async role
  func: async (req) => {
    const userId = await Promise.resolve(req.userId);
    return !!userId;
  },
});

const admin = new Guard.Role('admin', {
  can: ['viewHomePage', 'viewAuthSection', 'viewAdminSection'],
})

guard.roles = [admin, anyone, authenticated];

app.use((req, res, next) => {
  if (req.query.password === 'admin') {
    req.userId = 'fakeAdminId';
  } else {
    req.userId = null;
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/onlyForAuthenticated', async (req, res, next) => {
  await guard.requireAny('viewAuthSection')(req, res, next);
},
(req, res) => {
  res.send('Hello Authenticated User!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
