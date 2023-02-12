import socket
import time

IMAGE = 0
VIDEO = 1

def callPi(media=IMAGE):
    s = socket.socket()
    host = "raspberrypi"
    port = 5005

    s.connect((host, port))

    if (media == IMAGE):
        image_name = time.ctime().replace(' ','-').replace(':','-')
        s.send(bytes(image_name, encoding='utf-8'))

        file_name = "{0}.jpg".format(image_name)

        with open(file_name, 'wb') as f:
            print('file opened')
            start = time.time()
            while True:
                # print('receiving data...')
                data = s.recv(1024)
                # print('data=%s', (data))
                if not data:
                    break
                # write data to a file
                f.write(data)
            print(time.time() - start)
        f.close()
        print('Successfully get the file')
    s.close()
    print('connection closed')

callPi()