
import Skype4Py
import sys

skype = Skype4Py.Skype()
skype.Attach()
user = 'myjalga@gmail.com'
message = 'Test Message'
skype.SendMessage(user, message)