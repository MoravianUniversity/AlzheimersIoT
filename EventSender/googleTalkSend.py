import socket
import sys

messArr = sys.argv[1:]
message = ""
for i in messArr:
    message = message + i + " "

UDP_IP = socket.gethostbyname(socket.gethostname())
UDP_PORT = 8123

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(message.encode(), (UDP_IP, UDP_PORT))