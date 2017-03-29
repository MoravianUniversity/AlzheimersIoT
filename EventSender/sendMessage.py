import os

def sendStringToHome(message):
    baseURL = "204.186.197.73 "
    scriptName = "googleTalkSend.py "
    scriptCallType = "python3 "

    print(scriptCallType + scriptName + baseURL + message)
    os.system(scriptCallType + scriptName + baseURL + message)


if __name__ == '__main__':
    message = "Hello Google"
    sendStringToHome(message)