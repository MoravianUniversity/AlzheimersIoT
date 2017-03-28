import time

class EventSender():

    def __init__(self):
        self.email = "emailAddress"
        self.phoneNumber = 8562342250

    def loopForever(self):
        while(True):
            #call MMSE endpoint
            if(self.hasEndpointChanged()):
                self.sendNotifications()
            time.sleep(5)

    def hasEndpointChanged(self):
        #Bill's code goes here

    def sendNotifications(self):
        #send text message
        #send email
        #make google talk speak


if __name__ == "__main__":
    eventSender = EventSender()
    eventSender.loopForever()