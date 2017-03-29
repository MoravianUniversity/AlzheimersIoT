import time
from requests import get

class EventSender():

    def __init__(self):
        self.email = "emailAddress"
        self.phoneNumber = 8562342250
        self.baseURL = 'http://pegasus.cs.moravian.edu:8080/api/'
        self.endpointNames = ['gps', 'wemo', 'journal', 'medicineLogger', 'memoryGame']

    def loopForever(self):
        while(True):
            for endpointName in self.endpointNames:
                fileName = "APIFiles/" + endpointName + ".txt"
                newestAPIGet = get(self.baseURL + endpointName).content.decode()
                hasAPIChanged = self.readAndCompareDataFile(fileName, newestAPIGet)
                if(hasAPIChanged):
                    self.writeDataToFile(fileName, newestAPIGet)
                    self.sendNotifications(endpointName)
            time.sleep(5)
        
    def readAndCompareDataFile(self, fileName, newestAPIGet):
        with open(fileName, 'r') as file:
            hasAPIChanged = False
            oldAPIInfo = file.read()
            if (oldAPIInfo != newestAPIGet):
                hasAPIChanged =  True
        file.close()
        return hasAPIChanged
        

    def sendNotifications(self, endpointName):
        print("there has been an update in " + endpointName)
        #send text message
        #send email
        #make google talk speak
        return

    def writeDataToFile(self, fileName, newestAPIGet):
        with open(fileName, "w") as file:
            file.write(newestAPIGet)
            file.close()
        return


if __name__ == "__main__":
    eventSender = EventSender()
    eventSender.loopForever()