Generating Self-Signed Certificates
================

Note: This was adapted from [http://www.hacksparrow.com/express-js-https.html](http://www.hacksparrow.com/express-js-https.html)

#### Generating the Certificates
These commands will create a self-signed SSL certificate. Good for testing locally, but not recommended on a production server. Get a SSL certificate for your website from a reputed Certificate Authority.

```
# Assuming you're in the hscerts directory
$ openssl genrsa -out api-key.pem 1024
$ openssl req -new -key api-key.pem -out certrequest.csr
$ openssl x509 -req -in certrequest.csr -signkey api-key.pem -out api-cert.pem
```