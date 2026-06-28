#서보모터를 동시에 제어하는 코드

import RPi.GPIO as GPIO     # 라즈베리파이 GPIO 관련 모듈을 불러옴
from time import sleep      #time 라이브러리의 sleep함수 사용

GPIO.setmode(GPIO.BCM)      # GPIO 핀들의 번호를 지정하는 규칙 설정

### 이부분은 아두이노 코딩의 setup()에 해당합니다
servo1_pin = 4                   # 서보1 핀은 라즈베리파이 GPIO 4번핀으로 
servo2_pin = 27                    # 서보2 핀은 라즈베리파이 GPIO 27번핀으로 

GPIO.setup(servo1_pin, GPIO.OUT)  # 서보1 핀을 출력으로 설정 
GPIO.setup(servo2_pin, GPIO.OUT)  # 서보2 핀을 출력으로 설정 
servo1 = GPIO.PWM(servo1_pin, 50)  # 서보1 핀을 PWM 모드 50Hz로 사용
servo2 = GPIO.PWM(servo2_pin, 50)  # 서보2 핀을 PWM 모드 50Hz로 사용
servo1.start(0)  # 서보1의 초기값을 0으로 설정
servo2.start(0)  # 서보2의 초기값을 0으로 설정

servo_min_duty = 3               
servo_max_duty = 12              

def set_servo_degree(servo_num, degree): # 몇번째 서보모터를 몇도만큼 움직일지 결정하는 함수
    
    if degree > 180:
        degree = 180
    elif degree < 0:
        degree = 0

    # 각도에 따른 듀티비를 환산
    duty = servo_min_duty+(degree*(servo_max_duty-servo_min_duty)/180.0)

    # 환산된 듀티비를 서보1 혹은 2에 적용
    if servo_num == 1:
        servo1.ChangeDutyCycle(duty)
    elif servo_num == 2:
        servo2.ChangeDutyCycle(duty)

### 이부분은 코딩의 loop()에 해당합니다
try:                                    # 이 try 안의 구문을 먼저 수행하고
    #while True:                         # 무한루프 시작
        for ii in range(90, 180, 20):     # 0부터 180까지 5단위로 ii가 변하는 루프
            set_servo_degree(1, ii)     # 서보모터 1번은 ii만큼 움직임
            set_servo_degree(2, ii) # 서보모터 2번은 180-ii만큼 움직임
            sleep(0.1)                  # 0.1초간 대기
        for ii in reversed(range(90, 180, 20)):
            set_servo_degree(1, ii)
            set_servo_degree(2, ii)
            sleep(0.1)
            

finally:                                
    GPIO.cleanup()                      
