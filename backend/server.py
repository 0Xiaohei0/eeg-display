from flask import Flask, request,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
from threading import Thread, Event
import main
# Create thread
thread = Thread()
thread_stop_event = Event()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="http://localhost:5000")
userConnected = False

@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    userConnected = True
    print(request.sid)
    print("client has connected")
    global thread
    if not thread.is_alive():
        print("Starting Thread")
        print(type(main.graph))
        if(main.graph != None):
            print("Starting Thread222")
            thread = socketio.start_background_task(main.graph.update)

    #emit("connect",{"data":f"id: {request.sid} is connected"})
    #emit("connect",{"data":f"id: {request.sid} is connected"})

# def sendData(data):
#     print("send data")
#     if (userConnected):
#         print("send data user connected")
#         emit("data",{'data':data},broadcast=True)


# @socketio.on('data')
# def handle_message(data):
#     """event listener when client types a message"""
#     print("data from the front end: ",str(data))
#     emit("data",{'data':data,'id':request.sid},broadcast=True)

# @socketio.on("disconnect")
# def disconnected():
#     userConnected = False
#     """event listener when client disconnects to the server"""
#     print("user disconnected")
#     emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

if __name__ == '__main__':
    print("running server")
    main.InitializeEEG()
    socketio.run(app, debug=True,port=5001,)
    
# if __name__ == '__main__':
#   app.run(debug =True)