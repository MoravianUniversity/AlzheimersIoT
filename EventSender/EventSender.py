import time

class EventSender():

    def __init__(self):
        self.email = "emailAddress"
        self.phoneNumber = 8562342250
        self.url = 'http://pegasus.cs.moravian.edu:8080/api/'
        self.endpointNames = = ['gps', 'wemo', 'journal', 'medicineLogger', 'memoryGame']

    def loopForever(self):
    	data = []
        while(True):
        	for name in endpointNames:
            	#call MMSE endpoint
            	#get data dump
            	data = #dump
            	writeDataToFile(data)
            	if(self.hasEndpointChanged()):
                	self.sendNotifications()
            	time.sleep(5)

    def getAndWriteEndpointData(name):
        #Bill's code goes here
        data = get(self.url+name).content.decode()
        writeDataToFile(data)
        
    def readAndCompareDataFile(filename):
		with open(filename, 'r') as f:
			for line in f:
				#check to see if it has changed
        

    def sendNotifications(self):
        #send text message
        #send email
        #make google talk speak
        
	def writeDataToFile(data):
    	for name in endpointNames:
    		if(name+'.txt' != nil)
    			file = open(name+'.txt', "w")
				file.write(data)
				file.close()


if __name__ == "__main__":
    eventSender = EventSender()
    eventSender.loopForever()