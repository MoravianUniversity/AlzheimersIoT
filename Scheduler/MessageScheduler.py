import time, sys, datetime
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

        if medium is 'SMS':
            self.__add_SMS_notification(args)

        elif medium is 'Email':
            self.__add_Email_notification(args)

        elif medium is 'Google Home':
            self.__add_Google_Home_notification(args)


    # SMS Methods
    def __add_SMS_notification(self, args):
        self.__s.add_job(self.__send_SMS, 'date', run_date=time, kwargs=self.__get_kwargs_args(args))

    def __send_SMS(self, dest='UNDEFINED', msg='UNDEFINED'):
        print("{} MessageScheduler: {}, {}".format(time.time(), dest, msg), file=sys.stderr)

    # Email Methods
    def __add_Email_notification(self, args):
        return

    # Google Home Methods
    def __add_Google_Home_notification(self, args):
        return

    # General Helper Methods
    def __calc_delay(self, given_time):
        return given_time - time.time()

    def __get_kwargs_args(self, given_args):
        return {'dest': given_args['dest'], 'msg': given_args['msg']}


