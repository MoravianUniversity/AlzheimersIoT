Google Home Documentation:
================
## Setting Up the Journal Action
### Setting Up Your Local Database
If you haven't already done so, clone [Moravian College's Alzheimer's IoT](https://github.com/MoravianCollege/AlzheimersIoT) onto your local machine.

Refer to the [API Documentation](https://github.com/MoravianCollege/AlzheimersIoT/tree/master/API) to set up docker and get a local version of the API running on your local machine.  The API endpoint has already been created, so no need to follow the directions and create another one. The last command that's necessary is: 
```
docker-compose up -d
```
Now you have a local instance of the API running on your computer.  The journal endpoint can be reached at http://localhost:8080/api/journal.

### Installing Ngrok
In order for our journal webhook to be reached by Google's API.AI, we need to install and run ngrok.  If you don't already have a working version of ngrok on your computer, go ahead and download ngrok [here](https://ngrok.com/download).  Unzip the downloaded file.  In your terminal, make sure you're in the same directory as the unzipped file and run the following command:

```
mv ngrok /usr/local/bin
```

Congratulations, you now have ngrok installed on your computer!

### Running the Journal Webhook on Localhost
In your terminal, make sure you are in the AlzheimersIOT directory and
```
cd GoogleHome/Actions/Journal
```
Now, you can run the journal's webhook by running the command:
```
sudo python journal-webhook.py
```
Enter your password, and you should now see a message saying that the app is running on port 80. Make sure you keep this running in your terminal for as long as you want to access the webhook.

### Exposing the Webhook using ngrok
Since the journal webhook is just running on your localhost, you need to expose it so outside connections can get access to it.  This is done using ngrok.  In order to expose your webhook to outside connections, open up a new terminal and run the command:

```
ngrok http 80
```
If you used another port besides 80, replace 80 with the port number you are running the webhook on.

Your terminal should now display the URLs where you can access the webhook.  We are going to use the last URL that looks something like this: 
```
"https://b67ca24b.ngrok.io"
```
Note that the URL above is just an example and will not be the URL that ngrok is giving you to use.  You can go ahead and copy this link (the last one provided to you in the terminal that ngrok is running in), as you will need it for the next step.

###Connecting API.AI to the Webhook

Now that we have our journal webhook running and reachable to the outside world, we can now point our journal action that's hosted on Google's API.AI to it.

If you haven't already done so, log into Google with our Janet Johnson email account (credentials located on this [ticket](https://trello.com/c/aVCbIBqe/33-create-a-google-account-from-home-and-alexa) in Trello). Next, go to https://api.ai/ and click 'log in' on the upper right hand corner.  On the right side, there will be a link to log in with google.  Select the Janet Johnson account when Google asks you which account to use.  This will take you to our API.AI page where the actions we develop are located.

There will be a drop down menu located just underneath the API.AI logo on the top lefthand corner.  Click the menu and make sure that the "DailyJournal" action is selected.  This will take you to the Journal action's homepage.  On the lefthand side, there is a menu bar including links to the action's Intents, Entities, Training module, Integrations, and Fulfillment - all of which are distinguished by very nicely designed minimalist-looking graphics.  Click on the 'Fulfillment' tab distinguished by the minimalist-looking lightening bolt graphic.

You should now be looking at a page with a header entitled "Webhook".  One of the first fields on this page will be the URL field.  This is where you will paste to link to your ngrok instance that you had copied to your clipboard in the previous step.  After the link, be sure to add "/webhook", otherwise the webhook will not work.  You're welcome for saving you hours (or days) of confusion.  Inside of the URL field, you should have something (but not exactly) that looks like this:
```
https://b67ca24b.ngrok.io/webhook
```
Go ahead and click the big sky-blue save button on the top righthand side of the page.

####Side note:
The Journal action can only be pointed to one instance of the Journal webhook at a time.  If you would like to point it to a Journal webhook that is running on a different computer, you will have to repeat these steps on that copmuter (except for setting up the database and/or installing ngrok if those are already up and ready to go on that computer).

##Using the Journal Actions
Congratulations!  You now can use our journal action on the Google Home or on the Google Home web simulator.
### On the Google Home:
The Journal action can now be used on any Google Home that is connected to the Janet Johnson Google account.  To invoke to journal action, you can say:
```
"OK Google, talk to Journal."
```
The journal will then ask you what you did that day.  You can try saying something like:
```
"I rode my bike, went shopping, and cleaned the house."
```
Since you did not mentioned whether or not you took your medicine that day, the journal will ask you whether or not you have taken it - respond accordingly.

To stop talking to the Journal, say:
```
"Exit"
```
To see the data that had been posted to the API from this interaction, go to http://localhost:8080/api/journal on the computer that the webhook is running on. You should see a JSON entry that includes the activities and data from this interaction.

### On the Google Home Simulator:
Go back to the API.AI page and make sure you have "DailyJournal" selected as the action on the upper lefthand corner drop down menu.  On the toolbar on the left side, click "Integrations".  This will bring you to a page with a bunch of technologies on it.  Go ahead and click on the "Actions on Google square" (make sure you click on the square, not the toggle switch). A form will pop up titled "Actions on Google." Click "Authorize" in the bottom righthand corner (if instead you see "preview" right away, go ahead and click that). The same pop-up will appear, but this time click "preview" in the bottom righthand corner.

This should invoke a light blue rectangle to appear on the bottom righthand corner of your screen giving you the option to try it out on the simulator.  Go ahead and click that link.  This will bring you to the Web Simulator page.  Click "Start" in the center of the page. If asked, select the Janet Johnson google account.

Invoke the Journal action by typing:
```
OK Google, talk to jounral.
```
See "On the Google Home" above for a sample conversation.

To see what data had been posted to the API from this interaction, go to http://localhost:8080/api/journal on the computer that the webhook is running on. You should see a JSON entry that includes the activities and data from this interaction.
