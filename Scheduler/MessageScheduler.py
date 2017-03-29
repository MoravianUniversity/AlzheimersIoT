import os, requests, datetime, pytz
import socket

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

    def __send_SMS(self, dest='UNDEFINED', msg='UNDEFINED'):
        payload = {}
        requests.post(os.environ.get('SMS_API_URL'), data=payload)


    # Email Methods
    def __add_Email_notification(self, args):
        self.__s.add_job(self.__send_Email, 'date', run_date=self.__get_datetime_conversion(args['time']), kwargs=self.__get_kwargs_args(args))

    def __send_Email(self, dest='UNDEFINED', msg='UNDEFINED'):
        payload = {'recipient': dest, 'message': msg}
        header = {}
        requests.post(os.environ.get('EMAIL_API_URL'), data=payload)


    # Google Home Methods
    def __add_Google_Home_notification(self, args):
        self.__s.add_job(self.__send_Google_Home_TTS, 'date', run_date=self.__get_datetime_conversion(args['time']), kwargs=self.__get_kwargs_args(args))

    def __send_Google_Home_TTS(self, dest='UNDEFINED', msg='UNDEFINED'):
        url = os.environ.get('GOOGLE_HOME_API_URL').split(':')
        server = {'host': url[0], 'port': int(url[1])}

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.sendto(msg.encode(), (server['host'], server['port']))




    # General Helper Methods
    def __get_kwargs_args(self, given_args):
        return {'dest': given_args['dest'], 'msg': given_args['msg']}

    def __get_datetime_conversion(self, time_str):
        d = datetime.datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S %z")
        return d.astimezone(pytz.utc)