import sys
import homeassistant.remote as remote

api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')

message = sys.argv[1:]
out = ""
for i in message:
	out = out + i + " "
#file = open("outputString.txt", "w")
#file.write(out)
#file.close()

remote.call_service(api, 'tts', 'google_say', {'message': message})
