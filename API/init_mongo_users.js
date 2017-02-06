// init_mongo_users.js
//
// Run this script upon initial creation of the mongodb container + volume to
// set up the correct authorization method and a user for the node database.
//
// Note: This must be run from the host computer, i.e. the mongodb ports must be
//       accessible to the host in docker-compose.yml so you can run the command
//       `mongo < init_mongo_users.js`

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