Memory Game Install Instructions
================================

##Installing Flask-Ask:
On linux/raspian python comes preinstalled so simply run the command:
```
$pip install flask-ask
```

On MacOS first ensure that python is installed, if python is not installed follow this link 
https://docs.python.org/3/using/mac.html and then ensure pip is working correctly. Once this is done you can run the 
command:
```
$pip install flask-ask
```

On Windows if python is not installed follow these instructions 
http://docs.python-guide.org/en/latest/starting/install/win/. 
Once that is complete run the command:
```
$pip install flask-ask
```

##Running the Skill
cd into MemoryGame and then run the command:
```
$python memory_game.py
```

##Installing Ngrok 
Please go to the site here for instructions to download and use Ngrok: 
https://ngrok.com. Then after Ngrok is installed open a new terminal window and cd to where
Ngrok is stored then run the command:

On Mac/Linux:
```
$./ngrok http 5000
```

On Windows:
```
$ngrok.exe http 5000
```

Once that is running copy the last forwarding IP it should look like this:
```
https://20ba2c6f.ngrok.io
```

##Setting up with Amazon Alexa Developer
Log into your amazon developer account. Then select Alexa->develop new skill. After that follow the 
step by step guide up until you reach get certification and publish to the public, you do not need to 
go any further due to the fact that as long as your Amazon Alexa is link to the same account
your skill can now be used and tested.

An Intent Schema.json and an Sample Utterances.json have been included you can copy and paste these into the
necessary areas while proceeding through the guide.

##Running the skill
Once you have set your developer account up and linked your skill to it simply,
log into to your amazon echo with the same account and you can then begin testing your skill
on your echo device
