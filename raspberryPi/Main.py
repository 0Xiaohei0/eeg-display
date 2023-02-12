import socket
from picamera import PiCamera
import time
from signal import signal, SIGPIPE, SIG_DFL
signal(SIGPIPE,STG_DFL)

HOST = "0.0.0.0"
PORT = 5005
while True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        print("Create socket")
        s.setsockopt(socket.SQL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((HOST,PORT))
        s.listen()
        conn, addr = s.accept()
        with conn:
            print(f"Connected by {addr}")
            data = conn.recv(1024)
            filename = data.decode("utf-08")
            camera = PiCamera()
            camera.start_preview()
            time.sleep(2)
            image_name = "home/pi/Desktop/MindsEyePi/{0}.jpg".format(filename)
            camera.capture(image_name)
            camera.stop_preview()
            camera.close()
            f = open(filename+".jpg","rb")
            l = f.read(1024)
            while (l):
                conn.send(l)
                l = f.read(1024)
            f.close()
            conn.send(b"Thank you for connecting")
            conn.close()
            s.close()
    time.sleep(5)