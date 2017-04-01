from flask import Flask, request
import homeassistant.remote as remote

app = Flask(__name__)

api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')

@app.route('/googleSend',methods=['POST'])
def hello_world():
	message = request.form["message"]
	remote.call_service(api, 'tts', 'google_say', {'message': message})

if __name__ == '__main__':
	app.run(debug=True,host='0.0.0.0')

