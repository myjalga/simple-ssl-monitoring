#!/usr/bin/python

import smtplib

sender = 'from@fromdomain.com'
receivers = ['joenil@influex.com']

message = """From: From Person <from@fromdomain.com>
To: To Person <to@todomain.com>
Subject: SMTP e-mail test

This is a test e-mail message.
"""

smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
smtpObj.sendmail(sender, receivers, message)         
print "Successfully sent email"