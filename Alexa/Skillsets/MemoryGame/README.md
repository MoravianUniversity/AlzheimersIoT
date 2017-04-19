# Alexa Memory Game Skill

## What is the MMSE:

## What is an Alexa Skill:
An Alexa skill is a Logic based program that Alexa can execute and vocalize.

## What are Intents:
Intents are the logic triggers for an Alexa skill. Intents listen for the user
to speak when Alexa is running a skill and then generate a response based
on the logic contain in the skill. If you have more than one intent in your skill
then each intent should have a specific trigger for the logic can be run. Why have
specific keywords for intents see next category.

## The Logic Behind A One Intent Structure vs. Many Intent Structure:
The reason we are using one intent instead of many intents is because of how
the logic flows in an Alexa skill. In current Alexa Skills as of April 2017,
When a user says a command whichever Intent that command is linked to will be
triggered. The problem then is if we have a system like Memory Game where we
are asking questions and a multiple intent structure we could accidently trigger
more than one intent at a time or the wrong intent. Thus we create a state machine
design where we only have one intent that handles asking all the questions thus there
is only one intent that can be triggered which prevents the skill from glitching or using the wrong intent.

Please keep an eye on Amazon updates to see if they
change their logic system incase they ever add something
to directly address this issue.

## Why so Many files:
The reason their are multiple files is we were going for a
more object oriented design and trying to keep each file 
small and specific. For example getOauthInfo.py is
design to handle getting a Oauth authentication token and that is
it, the code in it can be imported and used by the other files. So when you adding new features try to keep their definitions
and designs in their own specific files and use import statements
to allow other files to call the code. The only place you cannot
abstract the code out from is main.py if you intend to add any more Alexa specific language like new intents you must add those
to the main, these will not work if they are inseparate files.

## Recommend IDE to work on this:
Pycharms or Visual Studio Code

## Current Issues:
Working on ensuring readability and clarity for the hand
off to the summer team

## Problems Down the Road:
Scaling will eventually become an issue due to the fact we are
using Flask-ask to self host and manage the Alexa skill. So 
scaling this up to more than one Alexa and client may become an
issue at some point.

## Why use Flask-Ask vs A Lambda function on Amazon:
If scaling is such a issue then your probably wondering why are 
we using Flask instead of Lambda which would handle scaling for us. The reason for this is simple while Lambda hosting is nice its
Alexa layout is not perfect for developing and testing a skill.
Lambda requires you get an additional amazon web service account which requires a credit card and you have to post your code into Amazon online IDE for it to be store in lambda. Thus each time a change is made it would require you to log into your amazon accounts and paste the new version of the code. Flask-ask on the other hand is a simple pip install and to run it all you have to type in is 
```
python main.py
```
and it will automatically launch linked to a specific port ready to recieve information from your echo dot. Also for Flask-ask we can just use git as normal for changes which means a git push when you want to push your changes up to our repository and a git pull to get any new changes to the code, you do not have to copy and paste the entire code base anywhere.

## Install Guide:
First use make sure that you have Docker installed if you do not simply go to https://www.docker.com. Once you have installed Docker run this command:
```
cd Alexa/skillset/MemoryGame
```
Once your are in the MemoryGame Folder then make sure the Dockerfile is present and run this command:
```
docker build -t MemoryGame .
```
This will generate a container with the MemoryGame all setup inside of it:
```
docker run -p 5000:5000 alexa
```
This will launch the MemoryGame inside of a self contained docker container.
Make sure that you Utterances and current intent schema are up to date on the 
Alexa development site and that the Echo is pointed to the right url address and it should be fully running.
