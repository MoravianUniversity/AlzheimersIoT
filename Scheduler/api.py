from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from MessageScheduler import MessageScheduler

app = Flask(__name__)
api = Api(app)
CORS(app)


class Scheduler(Resource):
    __message_scheduler = MessageScheduler()

    def get(self):
        return {'message': 'You\'ve sent a GET request to the Scheduler API'}

    def post(self):
        try:
            # Parse the args
            args = self.__get_parsed_args()

            # Check that the medium is supported
            self.__check_medium_is_supported(args['medium'])

            # Check for valid time
            self.__check_valid_time(args['time'])

            # Check for msg or valid latestEntryOf endpoint
            self.__check_msg_or_valid_latestEntryOf_endpoint_exists(args)

            # Send to the Scheduler
            self.__message_scheduler.add_message(args)

            return {'Created a job with the args:' : args}, 200

        except Exception as e:
            return {'Error': str(e)}, 400

    def __get_parsed_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument('medium', type=str, required=True,
                            help='Medium to send the msg over, e.g. \'SMS\', \'Email\', \'Google Home\')')
        parser.add_argument('time', required=True, type=str, help='Execution time in format \'YYYY-MM-DD HH:MM:SS +0000\'')
        parser.add_argument('dest', type=str, help='Destination, e.g. \'123456789\', \'example@domain.com\'')
        parser.add_argument('msg', type=str, help='The message to send')
        parser.add_argument('latestEntryOf', type=str,
                            help='An endpoint from which to retrieve the latest entries, e.g. \'GPS\'')

        return parser.parse_args()

    def __check_medium_is_supported(self, medium):
        supported_mediums = ['SMS', 'Email', 'Google Home']
        if medium not in supported_mediums:
            raise Exception('Medium \'{}\' is not supported.'.format(medium))

    def __check_valid_time(self, time):
        self.__message_scheduler.check_time(time)

    def __check_msg_or_valid_latestEntryOf_endpoint_exists(self, args):
        if args['msg'] is None and args['latestEntryOf'] is None:
            raise Exception('Request must have a \'msg\' or \'latestEntryOf\' parameter.')

        if args['msg'] is not None and args['latestEntryOf'] is not None:
            raise Exception('Request cannot have both a \'msg\' and \'latestEntryOf\' parameter.')

        if args['latestEntryOf'] is not None:
            self.__check_valid_latestEntry(args['latestEntryOf'])

    def __check_valid_latestEntry(self, endpoint):
        supported_endpoints = ['GPS']

        if endpoint not in supported_endpoints:
            raise Exception('Endpoint \'{}\' specified in arg \'latestEntryOf\' is not supported.'.format(endpoint))



api.add_resource(Scheduler, '/api/scheduler')

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
