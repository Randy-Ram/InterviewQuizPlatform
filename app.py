import os
from flask import Flask, send_from_directory, request, jsonify, session
from pprint import pprint
import datetime

app = Flask(__name__, static_folder='react_app/build')


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # print(path)
    print(request.full_path)
    if path != "" and os.path.exists("iqp/build/" + path):
        return send_from_directory('iqp/build', path)
    else:
        return send_from_directory('iqp/build', 'index.html')


@app.route('/api/startTest', methods=['POST'])
def start_test():
    pprint(request.get_json())
    print("Saving start time")
    session['start_time'] = datetime.datetime.now()
    return jsonify({'status': 'success'})


@app.route('/api/postResults', methods=['POST'])
def post_results():
    pprint(request.get_json())
    session['end_time'] = datetime.datetime.now()
    print(session['start_time'])
    print(session['end_time'])
    session['total_time'] = (session['end_time'] - session['start_time']).total_seconds()
    return jsonify({'status': 'success'})


@app.route('/api/authenticate', methods=['POST'])
def auth():
    print(request.get_json())
    if request.get_json().get('username') == 'rram' and request.get_json().get('password') == '12345':
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'failure'})


@app.route('/api/create_user', methods=['POST'])
def create_user():
    print(request.get_json())
    first_name = request.get_json().get('firstName')
    last_name = request.get_json().get('lastName')
    password = request.get_json().get('password')
    role = request.get_json().get('role')
    curr_index = 0
    user_id = first_name[0:2].lower() + last_name[0:2].lower() + str(curr_index)
    return user_id


'''
APIs to build:
 - Start Test
 - End Test
 - Update User
 
'''

if __name__ == '__main__':
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(use_reloader=True, port=5000, threaded=True)