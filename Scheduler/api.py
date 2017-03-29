from flask import Flask
from flask_restful import Resource, Api, reqparse
from MessageScheduler import MessageScheduler

app = Flask(__name__)
api = Api(app)


class Scheduler(Resource):
    def get(self):
        return {'message': 'You\'ve sent a GET request to the Scheduler API'}

    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('medium', type=str, help='Medium to send the msg over, e.g. \'SMS\', \'Email\', \'Google Home\')')
            parser.add_argument('time', type=str, help='Execution time in format \'YYYY-MM-DD HH:MM:SS\'')
            parser.add_argument('dest', type=str, help='Destination, e.g. \'123-456-789\', \'example@domain.com\'')
            parser.add_argument('msg', type=str, help='The message to send')
            args = parser.parse_args()

            # Check that the medium is supported
            supported_mediums = ['SMS', 'Email', 'Google Home']
            if args['medium'] not in supported_mediums:
                raise Exception("Medium {} is not supported.".format(args['medium']))

            # Send to the Scheduler
            message_scheduler = MessageScheduler()
            message_scheduler.add_message(args)

            return args

        except Exception as e:
            return {'error': str(e)}

api.add_resource(Scheduler, '/api/scheduler')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')

# args = {
#     'medium': 'SMS',
#     'time': '2017-03-27 23:58:00',
#     'dest': '123-456-7890',
#     'msg': 'hello'
# }
# msg.add_SMS_notification(args)