// init_mongo_users.js
//
// This script sets up the correct authorization method and a user for the
// node API.
//
// Note: This script should not be ran from the host computer,
// run initialize_database.sh instead.

use admin;

db.system.users.remove({})
db.system.version.remove({})
db.system.version.insert({ "_id" : "authSchema", "currentVersion" : 3 })

db.createUser({
  user: "system",
  pwd: "password",
  roles: [{
      role: "root",
      db: "admin"
    }, {
      role: "restore",
      db: "admin"
    }
  ]
});

use node;
db.createUser({
  user: "node",
  pwd: "password",
  "roles": [
    {
      "role": "readWrite",
      "db": "node"
    }
  ]
});