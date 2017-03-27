API_Test_program
================

##1.) Requirements:
To run the API_Test_program you will first need to ensure that you have installed Node.js if you
have not please proceed to this website,https://nodejs.org/en/, and install Node.js first then come back and proceed
with this setup guide.

##2.) Setup:
Next clone the AlzheimersIoT git repository onto your designated machine:
```
git clone https://github.com/MoravianCollege/AlzheimersIoT.git
```

after than run the command
```
cd AlzheimersIoT/API_Test_program
```

Once inside this folder run the command:
```
npm install
```

This command will read the package.json file and install the necessary dependencies for the Test suite to run.
However if it does not run these three commands in order:
```
npm install mocha
npm install chai
npm install request
```

Once that is complete you are now ready to run your tests.

##3.) Testing setup:
each testing file inside the test file will have a variable called "hostname" please ensure that it is pointed to 
the correct home address, api extensions are not necessary and should be added to the "hostname" only when its being
used by a specific test. See example test for more detail.

##4.) File Structure and Organization
the test folder is where you should place you java script files containing any tests you want run every time you 
call this program. Every file inside of test will be run when you call this program so keep this in mind as you
develop the testing scripts.

Furthermore each endpoint should have its own "test.js" file, which helps keeps the test organized and allows for 
a more readable and searchable code base.

##5.) To run the Test Suite
once you are ready to run the testing suite make sure you are inside the "API_Test_program" file and simply run
the command:
```
npm test
```

##6.) Testing Goals
Each endpoint test file should check these main things:
    - ensure a successful post/get
    - attempt to push corrupted data to ensure API has safe guards against this
    - attempt to make unauthorized/ unverified request to catch any security holes.