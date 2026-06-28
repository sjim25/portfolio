import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(21, GPIO.IN)

while 1:
    if GPIO.input(21):
        print("Detected")
    else :
        print("Not Detected")
        
    time.sleep(0.5)
    
GPIO.cleanup()

