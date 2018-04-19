const { guard } = require('./guard');

/*
// init a global role config
guard.config({
  roles: {
    voteOwner: {
      check(req) {
        return req;
      },
      allowed: ['*', 'listView', 'postView'],
    },
    anyone: {
      check() { return true; },
      allowed: ['listPosts'],
    },
  },
});


// add a role programmaticaly
guard.addRole('voteOwner2', () => true, ['listView', 'sayHello']);

// eslint-disable-next-line
console.log(guard);
*/

module.exports = guard;
