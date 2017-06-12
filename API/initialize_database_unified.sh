# initialize_database.sh

# Run this script upon initial creation of the mongodb container + volume to
# set up the correct authorization method and a user for the node database.

docker exec -i $(docker ps -f name=alzheimersiot_db_1 -q) mongo < mongo_init.js
