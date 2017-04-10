import homeassistant.remote as remote
import time
import requests

url = "http://pegasus.cs.moravian.edu:8080/api/wemo" #Enter url here
api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')

#Infinitely check status every 10 seconds
prevState = 10
while True:
    tm = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())) #Get time
    day = tm[0:10] #Separate day
    clock = tm[11:19] #Separate time
    # Get status
    status = False
    switch = remote.get_state(api, 'switch.aeotec_zw096_smart_switch_6_switch_3_0')
    st = switch.state
    if st == "on":
        status = True
    status = str(status).lower()
    #Print values
    print('date', day)
    print('time', clock)
    print('status', status)
    if prevState != status: #If updated status
        #Send to API
        r = requests.post(url, data={'date': day, 'time': clock, 'status': status.lower()})
        print("Info sent")
        r.close()
        print("Closed")
    prevState = status
    time.sleep(10) #wait
