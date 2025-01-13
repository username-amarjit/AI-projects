import json
from flask_cors import CORS
from flask import Flask, jsonify, request, Response
import time

from gemini import get_gemini_response

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"])
# to use cors in Flask application use it like this


def generate():
    # Here, you can process the incoming data in chunks
    # For example, let's simulate sending events back to the client
    # while True:
    # Simulating some event streaming
    time.sleep(4)
    yield 'data: Hello, world!\n\n'
    time.sleep(4)
    yield 'data: Another event!\n\n'
    time.sleep(4)
    yield 'data: Final event!\n\n'

def ApiCall(data):
    input_p = data.get("input_prompt")
    return get_gemini_response(input_p)

@app.route('/event-stream', methods=['POST'])
def event_stream():

    return Response(generate(), content_type='text/event-stream')


@app.route('/ApiCall', methods=['POST'])
def api_call():
    
    # Flask's request object has data in the data attribute.
    # the data is in binary format , so before you can use it you need to decode it
    # then if you are using json you need to parse it.
    
    data = json.loads(request.data.decode())
    # print(data)
    # print(data.get('input_prompt'))
    
    return Response(ApiCall(data), content_type='text/html')

# @app.route('/ApiCall', methods=['POST'])
# def api_call():
#     if request.method == 'OPTIONS':
#         return Response()
#     elif request.method == "POST":
#         data = json.loads(request.data.decode())
    
#         return jsonify({"message": "Success"}) #Response(ApiCall(data), content_type='text/html')



if __name__ == '__main__':
    app.run(debug=True)
    

