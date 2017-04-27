import time
import requests
from requests import *
import NotificationRecipientContactInfo

class EventSender():
        
    def __init__(self):
        self.emailAPIURL = "http://email_sender:5000/email"
        self.SMSAPIURL = "http://sms_sender:5000/sms"
        self.GoogleSendURL = "http://google_sender:5000/googleSend"
        self.baseURL = 'http://api:8080/api/'

        self.phoneAPIIURLGet = self.baseURL + "PhoneNumber"
        self.emailAPIURLGet = self.baseURL + "Email"

        self.endpointNames = ['gps', 'wemo', 'journal', 'medicineLogger', 'memoryGame', 'zWaveDoor']

    def loopForever(self):
        while(True):
            for endpointName in self.endpointNames:
                fileName = "APIFiles/" + endpointName + ".txt"
                newestAPIGet = get(self.baseURL + endpointName).content.decode()
                hasAPIChanged = self.readAndCompareDataFile(fileName, newestAPIGet)
                if(hasAPIChanged):
                    self.writeDataToFile(fileName, newestAPIGet)
                    self.sendNotifications("there has been an update in " + endpointName)
            time.sleep(5)
        
    def readAndCompareDataFile(self, fileName, newestAPIGet):
        with open(fileName, 'r') as file:
            hasAPIChanged = False
            oldAPIInfo = file.read()
            if oldAPIInfo != newestAPIGet:
                hasAPIChanged = True
        file.close()
        return hasAPIChanged

    def writeDataToFile(self, fileName, newestAPIGet):
        with open(fileName, "w") as file:
            file.write(newestAPIGet)
            file.close()
        return

    def sendNotifications(self, message):
        self.sendSMS(message, self.phoneAPIIURLGet, self.SMSAPIURL)
        self.sendEmail(message, self.emailAPIURLGet, self.emailAPIURL)
        #requests.post(self.GoogleSendURL, data={"message": message})
        return
        
    def sendEmail(self, message, APIURLLookUp, APIURLSend):
        recipients = requests.get(APIURLLookUp).content.decode()
        recipients = recipients.replace("[", "").replace("]", "").replace("\"", "")
        
        if (len(recipients) == 0):
            return
        
        recipients = recipients.split("},")
        
        for recipient in recipients:
            recipient = recipient.replace("}", "").replace("{", "")
            emailAddress = recipient.split(",")[1].split(":")[1]
            self.postEmailOrSMSMessage(message, APIURLSend, emailAddress)
        return


    def sendSMS(self, message, APIURLLookUp, APIURLSend):
        recipients = requests.get(APIURLLookUp).content.decode()
        recipients = recipients.replace("[", "").replace("]", "").replace("\"", "")
        
        if (len(recipients) == 0):
            return
        
        recipients = recipients.split(",")
         
        for recipient in recipients:
            recipient = recipient.replace("[", "").replace("]", "").replace("\"", "")
            phoneNumber = recipient.split(":")[1]
            self.postEmailOrSMSMessage(message, APIURLSend, phoneNumber)
        return

    def postEmailOrSMSMessage(self, message, APIURLSend, contactInfo):
        payload = {"message":message,"recipient":contactInfo}
        requests.post(APIURLSend, data=payload)
        return

if __name__ == "__main__":
    eventSender = EventSender()
    eventSender.loopForever()


