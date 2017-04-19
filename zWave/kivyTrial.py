import homeassistant.remote as remote
import time
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout

class Screen(GridLayout):

    def turnOn(self):
        url = "http://pegasus.cs.moravian.edu:8080/api/wemo"  # Enter url here
        api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')
        remote.call_service(api, 'switch', 'turn_on')  # domain might be 'switch'

    def turnOff(self):
        url = "http://pegasus.cs.moravian.edu:8080/api/wemo"  # Enter url here
        api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')
        remote.call_service(api, 'switch', 'turn_off')

    def cycle(self):
        url = "http://pegasus.cs.moravian.edu:8080/api/wemo"  # Enter url here
        api = remote.API('http://homeassistant.cs.moravian.edu:8123/states', 'raspberry')
        for i in range(3):
            remote.call_service(api, 'switch', 'turn_on')
            time.sleep(3)
            remote.call_service(api, 'switch', 'turn_off')
            time.sleep(3)

    def leave(self):
        exit()

    def __init__(self, **kwargs):
        super(Screen, self).__init__(**kwargs)
        self.cols =2
        self.row = 2
        self.on = Button(text="Turn On", on_press=lambda a:self.turnOn())
        self.add_widget(self.on)
        self.off = Button(text="Turn Off", on_press=lambda a:self.turnOff())
        self.add_widget(self.off)
        self.cyc = Button(text="Cycle", on_press=lambda a:self.cycle())
        self.add_widget(self.cyc)
        self.closeOut = Button(text="Exit", on_press=lambda a:self.leave())
        self.add_widget(self.closeOut)

class testApp(App):
    def build(self):
        return Screen()

testApp().run()
