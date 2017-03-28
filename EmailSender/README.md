#To Test the Email Sender
Run the command:
```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: 5015df74-53da-829c-2e8c-567272d752e9" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "recipient=your_email" -F "message=test message" "http://127.0.0.1:5000/email"
```