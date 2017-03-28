import socket
import sys
import homeassistant.remote as remote

api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')

UDP_IP = socket.gethostbyname(socket.gethostname())
UDP_Port = 8123

BUFFER_SIZE = 1024

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_Port))

while True:
    data, addr = sock.recvfrom(1024)
    remote.call_service(api, 'tts', 'google_say', {'message': data.decode()})