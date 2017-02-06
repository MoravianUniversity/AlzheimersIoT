Alexa Develop Skill Set Documentation
=====================================

##1.) Set Up a Development Account with Amazon
- First, if you wish to have your own developer account with amazon where you can link and test your skillsets.
  To set up a Amazon developer account simply go to https://developer.amazon.com. This step is only necessary if you
  wish to develop a skill set linked to a account specific to you, if that is not your goal please proceed to next 
  step.

##2.) Setup Flask-Ask
- For our development puposes we are using Flask-Ask for skill development. to install Flask-Ask follow these steps:
  On linux/raspian python comes preinstalled so simply run the command:
```
$pip install flask-ask
```

- On MacOS first ensure that python is installed, if python is not installed follow this link 
  https://docs.python.org/3/using/mac.html and then ensure pip is working correctly. Once this is done you can run the 
  command:
```
$pip install flask-ask
```

- On Windows if python is not installed follow these instructions 
  http://docs.python-guide.org/en/latest/starting/install/win/. 
  Once that is complete run the command:
```
$pip install flask-ask
```

- Flask-Ask is python based therefore all skill will have to be developed using python. Here a example imports
  you will be using in you python Alexa skill:
```
from flask import Flask, render_template
from flask_ask import Ask, statement, question, session
```

##3.)Install Ngrok 
- Please go to the site here for instructions to download and use Ngrok: 
  https://ngrok.com. Then after Ngrok is installed open a new terminal window and cd to where
  Ngrok is stored then run the command:

- On Mac/Linux:
```
$./ngrok http 5000
```

- On Windows:
```
$ngrok.exe http 5000
```

- Once that is running copy the last forwarding IP it should look like this:
```
https://20ba2c6f.ngrok.io
```

##4.) Skill Set File Structure
Your file structure should include:

- app_name.py: this is where the logic behind your skill is coded
    
- Intent_Schema.json: this is a json file in which the structure of how your conversation show go. For example,
  "Alexa" -> play game->"Alexa: are you ready" ->"yes intent"->Alexa: asks question ->"Answer Intent".
  So its basically the order of how a customer should respond to alexa.
      
- Sample_Utterances.json: this is a json file containing the expected responses for each intent, and allows a 
  developer to set custom key words/responses for intents. For example:
  "YesIntent yes,yep,sure,okay"
  This tells the Alexa API to accept these responses as alternate ways to say yes.
      
- templates.yaml - these contain the questions or item you wish to be vocalized by alexa when someone interacts
  with your skill.
  
- These must be together in your skill file for your skill to work properly. If one is missing Alexa my still 
  attempt to run however it will either error out or corrupt the answer data.
  
##5.) Once your app is complete
- Once you have completely finish creating all your necessary files you may begin testing your skill set. To do so 
  first $cd into you app's file where app_name.py is living. Then run:
```
python app_name.py
```
- It will then tell you the skill is running on localhost at a specific host. Next you need to launch Ngrok with 
  the same port as you python file.
- On Mac and Linux:
```
./ngrok http 5000
```
- On Windows:
```
ngrok.exe http 5000
```
- Once that is running copy the last forwarding IP it should look like this:
```
https://20ba2c6f.ngrok.io
```

##Setting up with Amazon Alexa Developer
- Log into your amazon developer account. Then select Alexa->develop new skill. After that follow the 
  step by step guide up until you reach get certification and publish to the public, you do not need to 
  go any further due to the fact that as long as your Amazon Alexa is link to the same account
  your skill can now be used and tested.

- An Intent Schema.json and an Sample Utterances.json should be copied and pasted into the corresponding categories
  in the Alexa Developer UI

##Running the skill
- Once you have set your developer account up and linked your skill to it simply,
  log into to your amazon echo with the same account and you can then begin testing your skill
  on your echo device



    
      
      