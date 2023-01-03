### server.py

from flask import Flask
from flask import request
from flask_cors import CORS

from tables import *
from make_response import make_response

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
CORS(app)

db.init_app(app)

with app.app_context():

    db.create_all()

@app.route("/")
def default():

    return "hello"

@app.route("/api/register", methods=["POST"])
def register():
    
    email = request.json["email"]
    password = request.json["password"]
    repeated_password = request.json["repeatPassword"]

    if password != repeated_password:

        return make_response(False, "passwords don't match")
    
    try:

        db.session.execute(db.select(User).where(User.email == email)).scalars().one()
    except:

        db.session.add(User(email = email, password = password))
        db.session.commit()

        return make_response(True)
    
    return make_response(False, "user already registered")

@app.route("/api/login", methods=["POST"])
def login():

    email = request.json["email"]
    password = request.json["password"]
    
    try:

        userQuery = db.session.execute(db.select(User).where(User.email==email)).scalars().one()
    except:

        return make_response(False, "user not found")

    if userQuery.password == password:

        return make_response(True)

    return make_response(False, "bad password")

if __name__ == "__main__":

    app.run(debug=True, host="0.0.0.0", port="5000")
