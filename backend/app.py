import flask
from flask import Flask, request, Response, jsonify
import json
from replace_names import replace_names, getFakeFirstName, getFakeLastName
from dotenv import load_dotenv
import os
app = Flask(__name__, static_folder='../redacter/build/', static_url_path='/')

load_dotenv()


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route("/replace", methods=['GET', 'POST'])
def replace_input():

    content = request.json
    text = content["text"]
    replaced, names = replace_names(text)
    response = {
        "names": names,
        "replaced": replaced
    }
    return Response(json.dumps(response),  mimetype='application/json')


@app.route("/getfakename")
def fakename():
    fakename = getFakeFirstName() + " " + getFakeLastName()
    fakeresponse = {
        "fakename": fakename
    }
    return Response(json.dumps(fakeresponse),  mimetype='application/json')


if __name__ == "__main__":

    app.run(debug=False, port=(os.getenv('PORT')
                               if os.getenv('PORT') else 5000), )
