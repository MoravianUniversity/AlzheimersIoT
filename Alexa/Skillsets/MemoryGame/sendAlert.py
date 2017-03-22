import smtplib

def sendMail(TEXT):
    FROM ='AlexaMemoryGame@pegasus.com'
    TO = ["6109057422@tmomail.net"]
    SUBJECT = "Memory Game"
    message = """\
        From: %s
        To: %s
        Subject: %s
        %s
        """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
    # Send the mail
    server = smtplib.SMTP('localhost')
    server.starttls()
    server.sendmail(FROM, TO, message)
    server.quit()