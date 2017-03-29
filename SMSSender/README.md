#To Test SMS
Run the Command:
```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: 5015df74-53da-829c-2e8c-567272d752e9" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "recipient=your_number" -F "message=SMS Test" "http://0.0.0.0:5050/sms"
```