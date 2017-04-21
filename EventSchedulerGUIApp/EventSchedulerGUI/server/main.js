import { Meteor } from 'meteor/meteor';
Emails = new Mongo.Collection('Emails');
PhoneNumbers = new Mongo.Collection('PhoneNumbers');
Meteor.startup(() => {
  // code to run on server at startup
});

