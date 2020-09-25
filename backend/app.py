import flask
from flask import Flask, request, Response, jsonify
import json
from replace_names import replace_names, replace_names_nltk, getFakeFirstName, getFakeLastName
from dotenv import load_dotenv
import os
import gc

# check to see if there is memory leaks
# gc.set_debug(gc.DEBUG_LEAK)

# Instantiate app
app = Flask(__name__, static_folder='../redacter/build/', static_url_path='/')

# Load environment variables for Heroku
load_dotenv()


@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route("/replace", methods=['GET', 'POST'])
def replace_input():

    content = request.json
    print(content)
    method = content["method"]
    replacemethod = content["replacemethod"]
    replacechar = content["replacechar"]
    text = content["text"]

    # Check which method to use
    if method == "stanford":
        replaced, names = replace_names(text, replacemethod, replacechar)
    else:
        replaced, names = replace_names_nltk(text, replacemethod, replacechar)

    # Build response
    response = {
        "names": names,
        "replaced": replaced
    }
    return Response(json.dumps(response),  mimetype='application/json')


#  echo function for server testing

@app.route("/echo", methods=['GET', 'POST'])
def echo():
    content = request.json
    text = content["text"]
    response = {
        text: text
    }
    return Response(json.dumps(response), mimetype='application/json')


# Get fake name
@app.route("/getfakename")
def fakename():
    fakename = getFakeFirstName() + " " + getFakeLastName()
    fakeresponse = {
        "fakename": fakename
    }
    return Response(json.dumps(fakeresponse),  mimetype='application/json')


if __name__ == "__main__":

    # Run app
    app.run(debug=False, port=(os.getenv('PORT')
                               if os.getenv('PORT') else 5000), )
