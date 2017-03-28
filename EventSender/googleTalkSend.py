import socket
import sys

messArr = sys.argv[2:]
message = ""
for i in messArr:
    message = message + i + " "

UDP_IP = sys.argv[1]
UDP_PORT = 8123

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.sendto(message.encode(), (UDP_IP, UDP_PORT))