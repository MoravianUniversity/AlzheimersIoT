import os, requests, datetime, pytz, sys

from apscheduler.schedulers.background import BackgroundScheduler

class SingletonMetaClass(type):
    def __init__(cls,name,bases,dict):
        super(SingletonMetaClass,cls)\
          .__init__(name,bases,dict)
        original_new = cls.__new__
        def my_new(cls,*args,**kwds):
            if cls.instance == None:
                cls.instance = \
                  original_new(cls,*args,**kwds)
            return cls.instance
        cls.instance = None
        cls.__new__ = staticmethod(my_new)


class MessageScheduler(metaclass=SingletonMetaClass):
    # using 'pass' to have the constructor of MessageScheduler reference the metaclass, i.e. act as a singleton
    pass

    def __init__(self):
        self.__s = BackgroundScheduler()
        self.__s.start()

    def add_message(self, args):
        # Grab a copy of the args to mutate later
        args = args.copy()

        medium = args['medium']

        if medium == 'SMS':
            self.__add_SMS_notification(args)

        elif medium == 'Email':
            self.__add_Email_notification(args)

        elif medium == 'Google Home':
            self.__add_Google_Home_notification(args)


    # SMS Methods
    def __add_SMS_notification(self, args):
        self.__s.add_job(self.__send_SMS, 'date', run_date=self.__get_datetime_conversion(args['time']), kwargs=self.__get_kwargs_args(args))

    def __send_SMS(self, dest='UNDEFINED', msg=None, latestEntryOf=None):
        payload = {'recipient': dest, 'message': self.__generate_message(msg, latestEntryOf)}
        requests.post("http://sms_sender:5000/sms", data=payload)

    # Email Methods
    def __add_Email_notification(self, args):
        self.__s.add_job(self.__send_Email, 'date', run_date=self.__get_datetime_conversion(args['time']), kwargs=self.__get_kwargs_args(args))

    def __send_Email(self, dest='UNDEFINED', msg=None, latestEntryOf=None):
        payload = {'recipient': dest, 'message': self.__generate_message(msg, latestEntryOf)}
        requests.post("http://email_sender:5000/email", data=payload)

    # Google Home Methods
    def __add_Google_Home_notification(self, args):
        self.__s.add_job(self.__send_Google_Home_TTS, 'date', run_date=self.__get_datetime_conversion(args['time']), kwargs=self.__get_kwargs_args(args))

    def __send_Google_Home_TTS(self, dest=None, msg=None, latestEntryOf=None):
        payload = {'message': self.__generate_message(msg, latestEntryOf)}
        requests.post("http://google_sender:5000/googleSend", data=payload)

    # Message Generation Methods
    def __generate_message(self, msg, latestEntryOf):
        if msg is not None:
            return msg

        if latestEntryOf == 'GPS':
            return self.__get_GPS_Message()

    def __get_GPS_Message(self):
        try:
            r = requests.get("http://api:8080/api/GPS")
            r.raise_for_status()

            rdic = r.json()[0]

            return "Latest location was ({}, {}) at {}.".format(rdic['lat'], rdic['lon'], rdic['time'])

        except Exception as e:
            return e


    # General Helper Methods
    def check_time(self, time):
        try:
            scheduled_time = self.__get_datetime_conversion(time)
        except Exception as e:
            raise Exception('Time \'{}\' is incorrectly formatted.'.format(time))

        current_time = datetime.datetime.now(pytz.utc)

        # if scheduled_time occurs before current time
        if scheduled_time < current_time:
            raise Exception('Time \'{}\' occurs in the past.'.format(time))



    def __get_kwargs_args(self, given_args):
        return {'dest': given_args['dest'], 'msg': given_args['msg'], 'latestEntryOf': given_args['latestEntryOf']}

    def __get_datetime_conversion(self, time_str):
        d = datetime.datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S %z")
        return d.astimezone(pytz.utc)




